const Project = require('../models/Project');

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('resources');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new project
exports.addProject = async (req, res) => {
    const { name, description, deadline, resources,status = 'Not Started', priority = 'Medium'} = req.body;
    try {
        const newProject = new Project({ name, description, deadline, resources,status, priority });
        await newProject.save();
        res.status(201).json({ message: 'Project added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update project details
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete project
exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await Project.findByIdAndDelete(id);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
