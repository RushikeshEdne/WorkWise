const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Engineer', 'Manager'], required: true },


    // New fields to track workload and performance
    currentWorkload: { type: Number, default: 0 }, // Hours of active work/projects assigned
    activeProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }], // List of active projects
    performanceRating: { type: Number, default: 0 } // For tracking employee performance (e.g., rating out of 5)
});

module.exports = mongoose.model('User', userSchema);
