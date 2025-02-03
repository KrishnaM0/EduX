const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// User Schema
const userSchema = new mongoose.Schema({
    firstName : {type : String},
    lastName : {type : String},
    email: { type: String },
    phone: { type: String },
    about : {type : String},
    profileImage : { type : String },
    linkedinUrl : {type : String},
    githubUrl : {type : String},
    instaUrl : {type : String},
    dob : {type : String},
});

userSchema.plugin(passportLocalMongoose); // Adds username, password, and authentication features

module.exports = mongoose.model("User", userSchema);

