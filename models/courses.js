
// let quizSchema = new mongoose.Schema({
//     questionNo: Number,
//     question: String,
//     options: [
//         {
//             option : String,
//         },
//     ], 
//     correctAnswer: String, 
// });

// let syllabusSchema = new mongoose.Schema({
//     chapter: String,
//     lecture: String,
//     notes: String, 
    // quiz: [quizSchema], 
// });

const mongoose = require("mongoose");

let courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    tutor: { type: String, required: true}, 
    image: String,
    // rating: { type: Number, default: 0, min: 0, max: 5 }, 
    rating : {type : Number},
    syllabus: [
        {
            
            chapter : String,
            lectureurl : String,
            notes : String,
        },
    ], 
});

module.exports = mongoose.model("Course", courseSchema);
