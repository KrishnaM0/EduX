if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const nodemailer = require("nodemailer");
const Courses = require("./models/courses.js");
const initData = require("./init/data.js");

const app = express();

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/Edux");
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

// Seed Data Function (Optional)
// Uncomment if you want to initialize the database with sample data
// const seedDatabase = async () => {
//     await Courses.insertMany(initData);
//     console.log("Sample data inserted");
// };
// seedDatabase();

// Home Route
app.get("/", async (req, res) => {
    try {
        const courses = await Courses.find();
        res.render("pages/home", { courses });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).send("Error loading the homepage");
    }
});

app.get("/signup", (req, res)=>{
    res.render("pages/signup.ejs");
});
app.get("/login", (req, res)=>{
    res.render("pages/login.ejs");
});

// Course Details Route
app.get("/shows/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Courses.findById(id);
        if (!course) {
            return res.status(404).send("Course not found");
        }
        res.render("pages/shows", { course });
    } catch (error) {
        console.error("Error fetching course details:", error);
        res.status(500).send("Error loading the course details");
    }
});

// Course Search Route
app.get("/courses", async (req, res) => {
    const { searchQuery } = req.query || "";
    let query = {};
    if (searchQuery) {
        query = {
            $or: [
                { title: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search for title
                { tutor: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search for tutor
            ],
        };
    }
    try {
        const courses = await Courses.find(query);
        res.render("pages/courses", { courses });
    } catch (error) {
        console.error("Error searching courses:", error);
        res.status(500).send("Error searching courses");
    }
});

// Update Notes Route
app.put("/shows/:id", async (req, res) => {
    const { id } = req.params;
    const { syllabus } = req.body;

    try {
        for (let i = 0; i < syllabus.length; i++) {
            const noteContent = syllabus[i].notes;
            await Courses.updateOne(
                { _id: id, [`syllabus.${i}`]: { $exists: true } },
                { $set: { [`syllabus.${i}.notes`]: noteContent } }
            );
        }
        res.redirect(`/shows/${id}`);
    } catch (error) {
        console.error("Error updating notes:", error);
        res.status(500).send("Error updating notes");
    }
});

// Quiz Route
app.get("/quiz/:courseId/:chapterIndex", async (req, res) => {
    const { courseId, chapterIndex } = req.params;
    try {
        const course = await Courses.findById(courseId);
        if (!course) {
            return res.status(404).send("Course not found");
        }

        const chapter = course.syllabus[chapterIndex];
        if (!chapter) {
            return res.status(404).send("Chapter not found");
        }

        if (!chapter.quiz || chapter.quiz.length === 0) {
            return res.status(404).send("Quiz not available for this chapter");
        }
        res.render("pages/quiz", { chapter, courseId, chapterIndex, course });
    } catch (error) {
        console.error("Error loading quiz:", error);
        res.status(500).send("Error loading quiz");
    }
});

// Dashboard Route
app.get("/dashboard", async (req, res) => {
    try {
        const courses = await Courses.find();
        res.render("pages/dashboard", { courses });
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Error loading dashboard");
    }
});

// Contact Page
app.get("/contact", (req, res) => {
    res.render("pages/contact");
});

// Contact Form Submission
app.post("/contact", async (req, res) => {
    const { cname, cemail, cmsg } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.ECONNECT, // Your email password
            },
        });

        const mailOptions = {
            from: `"${cname}" <${cemail}>`, // Sender's name and email
            to: process.env.EMAIL_USER, // Your receiving email
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
