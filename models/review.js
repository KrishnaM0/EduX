const mongoose = require("mongoose");

// Review Schema
const reviewSchema = new mongoose.Schema({
    comment: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }, // Simplified default value
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
});

module.exports = mongoose.model("Review", reviewSchema);




// const mongoose = require("mongoose");

// const reviewSchema = new mongoose.Schema({
//     comment : String,
//     rating : {
//         type : Number,
//         min : 1,
//         max : 5,
//     },
//     createdAt : {
//         type : Date,
//         default: () => Date.now(),
//     },
//     author : {
//         type : mongoose.Schema.Types.ObjectId,
//         ref : "User",
//     },
// });

// module.exports = mongoose.model("Review", reviewSchema);