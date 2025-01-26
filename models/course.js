const mongoose = require("mongoose");

// Quiz Schema
const quizSchema = new mongoose.Schema({
    qno: { type: Number, required: true },
    qname: { type: String, required: true },
    options: [{ option: { type: String, required: true } }],
    answer: { type: String, required: true },
});

// Syllabus Schema
const syllabusSchema = new mongoose.Schema({
    chapter: { type: String, required: true },
    lectureurl: { type: String, required: true },
    quiz: [quizSchema],
});

// Course Schema
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    tutor: { type: String, required: true },
    tutorlink: { type: String, default: "" },
    image: { type: String, default: "" },
    syllabus: [syllabusSchema],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Course", courseSchema);
