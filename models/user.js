const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, trim: true },
    phone: { type: String, match: /^[0-9]{10}$/ }, // Added regex for phone validation
});

userSchema.plugin(passportLocalMongoose); // Adds username, password, and authentication features

module.exports = mongoose.model("User", userSchema);

