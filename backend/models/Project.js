const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],



     // New fields to manage project progress and priority
     status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
     priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' } // Priority level
});

module.exports = mongoose.model('Project', projectSchema);
