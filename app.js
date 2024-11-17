const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const app = express();
const Courses = require("./models/courses.js");
const initData = require("./init/data.js");
const nodemailer = require("nodemailer");

mongoose.connect('mongodb://127.0.0.1:27017/Edux');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);


// let sampleData = async ()=>{
//     await Courses.insertMany(initData);
// };
// sampleData();


app.get("/", async (req, res)=>{
    let courses = await Courses.find();
    res.render("pages/home.ejs", {courses});
});

app.get("/show/:id", async (req, res)=>{
    let {id} = req.params;
    let course = await Courses.findById(id);
    res.render("pages/show.ejs", {course});
});

app.get("/signup", (req, res)=>{
    res.render("pages/signup.ejs");
});
app.get("/login", (req, res)=>{
    res.render("pages/login.ejs");
});
app.get("/courses", async (req, res) => {
    const { searchQuery } = req.query || "";
    let query = {};
    if (searchQuery) {
        query = {
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search for course title
                { tutor: { $regex: searchQuery, $options: 'i' } }  // Case-insensitive search for tutor name
            ]
        };
    }

    let courses = await Courses.find(query);
    res.render("pages/courses.ejs", { courses });
});

app.put("/show/:id", async (req, res) => {
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
        res.redirect(`/show/${id}`);
    } catch (err) {
        console.error("Error updating notes: ", err);
        res.redirect(`/show/${id}`);
    }
});

app.get("/quiz/:courseId/:chapterIndex", async (req, res) => {
    const { courseId, chapterIndex } = req.params;
    
    try {
        const course = await Courses.findById(courseId);
        if (!course) {
            return res.status(404).send('Course not found');
        }

        const chapter = course.syllabus[chapterIndex];
        if (!chapter) {
            return res.status(404).send('Chapter not found');
        }

        if (!chapter.quiz || chapter.quiz.length === 0) {
            return res.status(404).send('Quiz not available for this chapter');
        }
        res.render("pages/quiz", { chapter, courseId, chapterIndex, course });
    } catch (err) {
        console.error("Error loading quiz: ", err);
        res.status(500).send('Server error');
    }
});

app.get("/dashboard", async (req, res)=>{
    let courses = await Courses.find();
    res.render("pages/dashboard", {courses});
});

app.get("/contact", (req, res)=>{
    res.render("pages/contact.ejs");
});

app.post("/contact", async (req, res) => {
    const { cname, cemail, cmsg } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "krishnamuskawad31@gmail.com",
                pass: "djmk ckbd flpy xxoi",
            },
        });

        const mailOptions = {
            from: `"${cname}" <${cemail}>`, // Sender's name and email
            to: "krishnamuskawad31@gmail.com",
            subject: "New Contact Form Submission",
            text: `You have received a new message:
            Name: ${cname}
            Email: ${cemail}
            Message: ${cmsg}`,
        };

        await transporter.sendMail(mailOptions);

        res.send("Thank you for contacting us. Your message has been sent!");
    } catch (error) {
        console.error("Error sending email: ", error);
        res.status(500).send("There was an error sending your message. Please try again later.");
    }
});

app.listen(8080, ()=>{
    console.log("The server is working..!");
});
