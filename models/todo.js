const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    task:{
        type : String,
    },
    status:{
        type : String,
    },
    addedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Todo", todoSchema);