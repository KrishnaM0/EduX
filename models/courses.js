
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
    tutorlink : {type : String},
    image: String,
    rating: { type: Number, min: 0, max: 5, default: 0 }, // Limiting rating from 0 to 5
    // rating : {type : Number},
    syllabus: [
        {
            chapter : String,
            lectureurl : String,
            notes : String,
            quiz : [
                {
                    qno : {type : Number},
                    qname : {type : String},
                    options : [
                        {
                            option : {type : String},
                        },
                    ],
                    answer : {type : String},
                },
            ],
        },
    ], 
});

module.exports = mongoose.model("Course", courseSchema);
