const mongoose = require("mongoose");

// Enrolled Course Schema
const enrolledCourseSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    course: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course", 
        required: true 
    },
    enrollmentDate: { 
        type: Date, 
        default: Date.now 
    },
    completionStatus: { 
        type: String, 
        enum: ["in-progress", "completed", "dropped"], 
        default: "in-progress" 
    },
    progress: { 
        type: Number, // Percentage of course completion (0 to 100)
        default: 0 
    },
    lastAccessed: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

module.exports = mongoose.model("EnrolledCourse", enrolledCourseSchema);
