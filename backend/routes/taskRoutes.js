// routes/taskRoutes.js
const express = require('express');
const { addTask, getTasksForProject, markTaskAsCompleted } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add task with automatic assignment
router.post('/tasks', authMiddleware('Manager'), addTask);

// Get all tasks for a specific project
router.get('/projects/:projectId/tasks', authMiddleware(), getTasksForProject);

// Mark task as completed here manager  can mark  task as complete which they assigned (wheather the same manager is required i have to have future scope)
router.put('/tasks/:id/complete', authMiddleware('Manager'), markTaskAsCompleted);

module.exports = router;
