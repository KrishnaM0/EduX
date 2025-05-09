if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const nodemailer = require("nodemailer");

const Courses = require("./models/course");
const QuizResult = require("./models/quizResult");
const Review = require("./models/review");
const Notes = require("./models/notes");
const User = require("./models/user");
const EnrolledCourse = require("./models/enrolled");
const Todo = require("./models/todo");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");


const axios = require("axios");
// const cors = require("cors");

const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const initData = require("./init/data");
const mongoStore = require("connect-mongo");

// MongoDB Connection
const dbUrl = process.env.DBURL;
mongoose.connect(dbUrl);
// mongoose.connect(process.env.DBURL || "mongodb://127.0.0.1:27017/Edux");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// Middleware and Engine Setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());  // ✅ Parse JSON requests
app.use(cors());

const store = mongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter : 24 * 3600,
});

store.on("error", ()=>{
    console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global Variables Middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Seed Data Function
// Uncomment to initialize the database with sample data
// const seedDatabase = async () => {
//     await Courses.deleteMany({});
//     await Courses.insertMany(initData);
//     console.log("Sample data inserted");
// };
// seedDatabase();

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in!");
        return res.redirect("/login");
    }
    next();
};


// Gemini Chatbot Integration : -
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        if (!userMessage) {
            return res.status(400).json({ reply: "❌ Error: No message provided." });
        }

        console.log("User Message:", userMessage);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(userMessage);
        const botReply = result.response.text();

        res.json({ reply: botReply });
    } catch (error) {
        console.error("Chatbot API Error:", error.message);
        res.status(500).json({ reply: "❌ Error: Unable to fetch response." });
    }
});



// OpenAI Chatbot Integration : -
// const OpenAI = require("openai"); // ✅ Correct import
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set in .env
// });

// app.post("/chat", async (req, res) => {
//     try {
//         const userMessage = req.body.message;
//         console.log("User Message:", userMessage);

//         if (!userMessage) {
//             return res.status(400).json({ reply: "❌ Error: No message provided." });
//         }

//         console.log("Using API Key:", process.env.OPENAI_API_KEY ? "✅ Loaded" : "❌ Not Loaded");

//         // Make request to OpenAI API
//         const response = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [{ role: "user", content: userMessage }],
//         });

//         const botReply = response.choices[0]?.message?.content || "I couldn't understand that.";

//         res.json({ reply: botReply });
//     } catch (error) {
//         console.error("Chatbot API Error:", error.response?.data || error.message);
//         res.status(500).json({ reply: "❌ Error: Unable to fetch response." });
//     }
// });


app.delete('/shows/:courseId/reviews/:reviewId', async (req, res, next) => {
    let {courseId, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/shows/${courseId}`);
    }
    next();
});

// Routes
app.get("/", async (req, res) => {
    try {
        const courses = await Courses.find();
        res.render("pages/home", { courses });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).send("Error loading the homepage");
    }
});

app.get("/signup", (req, res) => {
    res.render("users/signup");
});

app.post("/signup", async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", `Welcome to EduX! ${req.user.username}`);
            res.redirect("/dashboard");
        });
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
});

app.get("/login", (req, res) => {
    res.render("users/login");
});

app.post("/login", passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
}), (req, res) => {
    req.flash("success", `Welcome back! ${req.user.username}`);
    res.redirect("/dashboard");
});

app.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);
        req.flash("success", "You have been logged out successfully.");
        res.redirect("/login");
    });
});

app.get("/shows/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Courses.findById(id).populate({path : "reviews", populate : {path : "author",},}).populate("owner");;
        const notes = await Notes.find();
        const review = await Review.find();
        if (!course) {
            return res.status(404).send("Course not found");
        };
        let isEnrolled = false;
        if (req.user) {
            const existingEnrollment = await EnrolledCourse.findOne({ user: req.user._id, course: id });
            isEnrolled = !!existingEnrollment;
        }
        res.render("pages/shows", { course, notes, review, isEnrolled });
    } catch (error) {
        console.error("Error fetching course details:", error);
        res.status(500).send("Error loading the course details");
    }
});

// Save Notes
app.put("/shows/:courseId/notes", isLoggedIn, async (req, res) => {
    const { courseId } = req.params;
    const { chapterNotes } = req.body; // Ensure the body contains chapter and notes
    const { chapter } = req.body;
    try {
        let existingNote = await Notes.findOne({ user: req.user._id, course: courseId, chapter });
        if (existingNote) {
            // Update existing note
            existingNote.notes = chapterNotes;
            await existingNote.save();
        } else {
            // Create new note
            const newNote = new Notes({
                user: req.user._id,
                course: courseId,
                chapter: chapter,
                notes: chapterNotes,
            });
            await newNote.save();
        };

        req.flash("success", "Notes saved successfully.");
        res.redirect(`/shows/${courseId}`);
    } catch (error) {
        req.flash("error", "Failed to save notes.");
        res.redirect(`/shows/${courseId}`);
    }
});

// Save Quiz Results
app.post("/submitQuiz", isLoggedIn, async (req, res) => {
    try {
        const { courseId, chapterIndex, ...submittedAnswers } = req.body;

        // Fetch quiz details to validate user input
        const course = await Courses.findById(courseId);
        if (!course || !course.syllabus[chapterIndex]) {
            req.flash("error", "Invalid course or chapter");
            return res.redirect("back");
        }

        const chapter = course.syllabus[chapterIndex];
        let correctAnswers = 0;
        const totalQuestions = chapter.quiz.length;

        // Validate answers
        chapter.quiz.forEach((quiz) => {
            if (submittedAnswers[`quiz-${chapterIndex}-${quiz.qno}`] === quiz.answer) {
                correctAnswers++;
            }
        });

        // Save result
        const quizResult = new QuizResult({
            user: req.user._id,
            course: courseId,
            chapter: chapter.chapter,
            quizId: chapter._id,
            selectedAnswers: Object.values(submittedAnswers),
            correctAnswers : correctAnswers,
            totalQuestions: totalQuestions,
            percentage: (correctAnswers / totalQuestions) * 100,
        });
        await quizResult.save();
        const percentages = (correctAnswers / totalQuestions) * 100;


        // Count total quizzes in the course
        const courseforquiz = await Courses.findById(courseId);
        // const totalQuizzes = courseforquiz ? courseforquiz.syllabus.reduce((count, chapter) => count + chapter.quiz.length, 0) : 0;
        const totalQuizzes = courseforquiz ? courseforquiz.syllabus.length : 0;
        // Count quizzes attempted by user
        const completedQuizzes  = await QuizResult.countDocuments({ user: req.user._id, course: courseId });

        // Calculate course progress
        const progress = Math.round((completedQuizzes  / totalQuizzes) * 100);

        // Update enrolled course progress
        await EnrolledCourse.findOneAndUpdate(
            { user: req.user._id, course: courseId },
            { progress, lastAccessed: new Date() },
            { new: true }
        );
        req.flash("success", `Quiz completed! You scored ${percentages.toFixed(2)}%.`);
        res.redirect(`/shows/${courseId}`);
    } catch (err) {
        console.error(err);
        req.flash("error", "An error occurred while submitting the quiz.");
        res.redirect("back");
    }
});

// Handle search queries in courses page
app.get("/courses", async (req, res) => {
    const { searchQuery } = req.query || "";
    const query = searchQuery ? {
        $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { tutor: { $regex: searchQuery, $options: "i" } },
        ]
    } : {};
    try {
        const courses = await Courses.find(query);
        res.render("pages/courses", { courses });
    } catch (error) {
        console.error("Error searching courses:", error);
        res.status(500).send("Error searching courses");
    }
});


// Add review to course
app.post('/shows/:courseId/reviews', async (req, res) => {
    let course = await Courses.findById(req.params.courseId);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    course.reviews.push(newReview);
    await newReview.save();
    await course.save();
    req.flash("success", "New Review Created..!");
    res.redirect(`/shows/${course._id}`);
});
  
// Delete review from course
app.delete('/shows/:courseId/reviews/:reviewId', async (req, res) => {
    let {courseId, reviewId} = req.params;
    await Courses.findByIdAndUpdate(courseId, {$pull: {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted..!");
    res.redirect(`/shows/${courseId}`);
});


// Enroll in a course
app.post("/enroll/:courseId", isLoggedIn, async (req, res) => {
    try {
        const userId = req.user._id; // Get logged-in user's ID
        const courseId = req.params.courseId;

        // Check if the user is already enrolled
        const existingEnrollment = await EnrolledCourse.findOne({ user: userId, course: courseId });

        if (existingEnrollment) {
            req.flash("error", "You are already enrolled in this course.");
            return res.redirect(`/shows/${courseId}`);
        }

        // Create new enrollment
        const newEnrollment = new EnrolledCourse({
            user: userId,
            course: courseId,
        });

        await newEnrollment.save();
        req.flash("success", "Successfully enrolled in the course!");
        res.redirect(`/dashboard`);
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong.");
        res.redirect("back");
    }
});


function calculateProgress(enrolledCourses) {
    let totalProgress = 0;
    let completedCourses = 0;

    enrolledCourses.forEach(course => {
        totalProgress += course.progress;
        if (course.progress === 100) completedCourses++;
    });

    return enrolledCourses.length ? (totalProgress / enrolledCourses.length).toFixed(2) : 0;
}

app.get("/dashboard", isLoggedIn, async (req, res) => {
    try {
        // await Todo.deleteMany({});
        const curruser = await User.find(req.user._id);
        const users = await User.find();  // Fetch all users
        const courses = await Courses.find();
        const quizResult = await QuizResult.find({ user: req.user._id }).populate('course');
        const enrolledCourses = await EnrolledCourse.find({ user: req.user._id }).populate("course");
        const todo = await Todo.find({user:req.user._id, status : "pending"});
        const todoDone = await Todo.find({user:req.user._id, status : "done"});

        // Compute progress and number of enrolled courses for each user
        const updatedUsers = await Promise.all(users.map(async user => {
            // Fetch enrolled courses for each user (assuming user.enrolledCourses is an array of course IDs)
            const enrolledUserCourses = await EnrolledCourse.find({ user: user._id }).populate('course');
            user.courseProgress = calculateProgress(enrolledUserCourses);  // Calculate progress
            user.enrolledCoursesCount = enrolledUserCourses.length;  // Count enrolled courses
            return user;
        }));
        curruser.courseProgress = calculateProgress(enrolledCourses);  // Calculate the average progress
        res.render("pages/dashboard", { curruser, courses, quizResult, todo, todoDone, enrolledCourses, users: updatedUsers });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).send("Error loading the dashboard");
    }
});

// Route to get user dashboard
app.get("/user/:id", async (req, res) => {
    try {
        // Fetch the user by ID from the database
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }

        // You can fetch additional data related to the user, such as their courses or quiz results
        const enrolledCourses = await EnrolledCourse.find({ user: user._id }).populate("course");
        const quizResult = await QuizResult.find({ user: user._id }).populate('course');
        user.courseProgress = calculateProgress(enrolledCourses);  // Calculate the average progress

        // Render the user's dashboard page
        res.render("users/userDashboard", { user, enrolledCourses, quizResult });
    } catch (error) {
        console.error("Error fetching user dashboard:", error);
        res.status(500).send("Error loading user dashboard");
    }
});


// Dashboard - Edit Profile
app.get("/dashboard/editProfile", (req, res)=>{
    res.render("users/editProfile");
});
app.put("/dashboard/editProfile", async(req, res)=>{
    let {firstName, lastName, phone, about, profileImage, linkedinUrl, githubUrl, instaUrl, dob} = req.body;
    await User.updateOne({username : req.user.username}, {$set :
        {
            firstName,
            lastName,
            phone,
            about,
            profileImage,
            linkedinUrl, 
            githubUrl, 
            instaUrl,
            dob,
        },
    });
    req.flash("success", "Profile is updated..!");
    res.redirect("/dashboard");
});


// 
app.delete("/deleteAccount", async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            req.flash("error", "You must be logged in to delete your account.");
            return res.redirect("/login");
        }

        const userId = req.user._id;

        // ✅ Delete all user-related data in parallel
        await Promise.all([
            Review.deleteMany({ author: userId }),
            Courses.updateMany({}, { $pull: { reviews: userId } }),
            EnrolledCourse.deleteMany({ user: userId }),
            QuizResult.deleteMany({ user: userId }),
            Notes.deleteMany({ user: userId }),
            User.findByIdAndDelete(userId)
        ]);

        // ✅ First set flash message BEFORE destroying session
        req.flash("success", "Your account and all associated data have been deleted.");

        // ✅ Logout the user properly (Passport 0.6+ requires a callback)
        req.logout(function (err) {
            if (err) {
                console.error("Logout error:", err);
                return res.redirect("/dashboard");
            }

            // ✅ Destroy session AFTER setting flash message
            req.session.destroy(() => {
                res.redirect("/");
            });
        });

    } catch (error) {
        console.error("Error deleting user:", error);
        req.flash("error", "Error deleting account.");
        res.redirect("/dashboard");
    }
});


// Contact form handling
app.get("/contact", (req, res) => {
    res.render("pages/contact");
});

app.post("/contact", async (req, res) => {
    const { cname, cemail, cmsg } = req.body;
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.ECONNECT,
            },
        });

        const mailOptions = {
            from: `"${cname}" <${cemail}>`,
            to: process.env.EMAIL_USER,
            subject: "New Contact Form Submission",
            text: `You have received a new message:
            Name: ${cname}
            Email: ${cemail}
            Message: ${cmsg}`,
        };

        await transporter.sendMail(mailOptions);
        res.send("Thank you for contacting us. Your message has been sent!");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("There was an error sending your message. Please try again later.");
    }
});

// todo application
// Route to Add New Task
app.post("/todo/newtask", async (req, res) => {
    try {
        // await Todo.deleteMany({});
        if (!req.user) {
            return res.status(401).send("Unauthorized: Please log in"); // Prevent saving without a user
        }
        const { task } = req.body;
        const newTask = new Todo({
            user: req.user._id, // Store user ID instead of entire user object
            task: task,
            status : "pending",
        });
        await newTask.save();
        res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding task");
    }
});


// delete and mark as done todo tasks
// Update Task Status
app.put("/todo/update/:id", async (req, res) => {
    try {
        const { status } = req.body;
        await Todo.findByIdAndUpdate(req.params.id, { status });
        res.status(200).send("Task updated successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating task!");
    }
});

// Delete Task
app.delete("/todo/delete/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).send("Task deleted successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting task!");
    }
});


// Server Listener
app.listen(8080, () => {
    console.log("The server is running on port 8080!");
});
