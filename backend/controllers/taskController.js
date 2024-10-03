// 2. Workload Balancer Algorithm
// We'll create an algorithm to automatically assign tasks to employees based on their current workload.

// Current Workload: The number of ongoing tasks.
// Capacity: The number of tasks they can handle at a given time (set a default).



// controllers/taskController.js
const Task = require('../models/Task');
const User = require('../models/User');
const Project = require('../models/Project');

// Helper function to find the employee with the least workload
const findBestEmployee = async (projectId) => {
    const employees = await User.find({ role: 'Engineer' });

    const MAX_TASK_LIMIT = 5; // Configurable capacity

    // Get workload (number of pending tasks) for each employee
    const employeeWorkloads = await Promise.all(
        employees.map(async (employee) => {
            const workload = await Task.countDocuments({ assignedTo: employee._id,status: 'Pending' });
            return { employee, workload };
        })
    );

    // Sort employees by their workload (ascending order)
    employeeWorkloads.sort((a, b) => a.workload - b.workload);

    // Return the employee with the least workload
    return employeeWorkloads[0].employee;
};

// Add new task with automatic workload balancing
exports.addTask = async (req, res) => {
    const { name, description, deadline, projectId } = req.body;

    try {
        // Ensure project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Find the best employee for the task
        const bestEmployee = await findBestEmployee(projectId);

        // Create and assign the task to the best employee
        const newTask = new Task({
            name,
            description,
            deadline,
            assignedTo: bestEmployee._id,
            //employeeName:employee.name,
            project: project._id
        });

        await newTask.save();
        res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all tasks for a specific project
exports.getTasksForProject = async (req, res) => {
    const { projectId } = req.params;

    try {
        const tasks = await Task.find({ project: projectId }).populate('assignedTo', 'name');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mark task as completed
exports.markTaskAsCompleted = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
       
        task.status = 'Completed';
        await task.save();
        res.json({ message: 'Task marked as completed', task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
