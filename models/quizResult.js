const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    chapter: { type: String },
    quizId: { type: mongoose.Schema.Types.ObjectId },
    selectedAnswers: [String],
    correctAnswers: { type: Number },
    totalQuestions: { type: Number },
    percentage: { 
        type: Number, 
        set: (value) => parseFloat(value.toFixed(2)) // Round to 2 decimal places
    },
    attemptedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("QuizResult", quizResultSchema);
