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

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const initData = require("./init/data");
const mongoStore = require("connect-mongo");

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Edux");

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

// Session Configuration
const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    // store: mongoStore.create({ mongoUrl: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Edux" }),
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
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
    const { username, email, password, phone } = req.body;
    try {
        const newUser = new User({ username, email, phone });
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
        res.render("pages/shows", { course, notes, review });
    } catch (error) {
        console.error("Error fetching course details:", error);
        res.status(500).send("Error loading the course details");
    }
});

// Save Notes
app.put("/shows/:courseId", isLoggedIn, async (req, res) => {
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




app.get("/dashboard", isLoggedIn, async (req, res) => {
    try {
        const courses = await Courses.find();
        // Fetch quiz results for the logged-in user
        const quizResult = await QuizResult.find({ user: req.user._id }).populate('course');
        
        res.render("pages/dashboard", { courses, quizResult });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).send("Error loading the dashboard");
    }
});

// app.get("/dashboard", isLoggedIn, async (req, res) => {
//     try {
//         const courses = await Courses.find();
//         const quizResult = await QuizResult.find(req.user._id);
//         res.render("pages/dashboard", { courses, quizResult });
//     } catch (error) {
//         console.error("Error loading dashboard:", error);
//         res.status(500).send("Error loading dashboard");
//     }
// });

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

// Server Listener
app.listen(8080, () => {
    console.log("The server is running on port 8080!");
});
