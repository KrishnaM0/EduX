const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const app = express();
const Courses = require("./models/courses.js");

mongoose.connect('mongodb://127.0.0.1:27017/Edux');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);

// let sampleData = async ()=>{
//     let course = [
//         {
//             title: 'Python for Beginners',
//             tutor: 'Telusko',
//             image: 'https://i.ytimg.com/vi/YfO28Ihehbk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCqmWkLQL0HmrsMlt7HW-WzTW5W2w',
//             rating: 4.6,
//             syllabus: [
//                 {
//                     chapter: 'Python Tutorial',
//                     lectureurl: 'YfO28Ihehbk',
//                     notes: 'Your Notes..!',
//                 },                
//             ]
//         },
//     ]
//     await Course.insertMany(course);
// };

// sampleData();


app.get("/", async (req, res)=>{
    let courses = await Courses.find();
    // console.log(course);
    res.render("pages/home.ejs", {courses});
});

app.get("/show/:id", async (req, res)=>{
    let {id} = req.params;
    let course = await Courses.findById(id);
    // console.log(courses);
    res.render("pages/show.ejs", {course});
});

app.get("/login", (req, res)=>{
    res.render("pages/login.ejs");
});

app.get("/courses", async (req, res)=>{
    let courses = await Courses.find();
    res.render("pages/courses.ejs", {courses});
});
app.get("/about", (req, res)=>{
    res.render("pages/about.ejs");
});
app.get("/contact", (req, res)=>{
    res.render("pages/contact.ejs");
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



app.listen(8080, ()=>{
    console.log("The server is working..!");
});