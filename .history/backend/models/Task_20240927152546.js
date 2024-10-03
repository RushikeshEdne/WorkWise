// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//     project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
//     description: { type: String, required: true },
//     assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
//     dueDate: { type: Date, required: true }
// });

// module.exports = mongoose.model('Task', taskSchema);
// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, default: 'Pending' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
