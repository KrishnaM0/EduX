const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String },
    phone: { type: String },
});

userSchema.plugin(passportLocalMongoose); // Adds username, password, and authentication features

module.exports = mongoose.model("User", userSchema);

