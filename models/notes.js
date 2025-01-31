const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    chapter: { type: String },
    notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Notes", notesSchema);
