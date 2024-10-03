// routes/taskRoutes.js
const express = require('express');
const { addTask, getTasksForProject, markTaskAsCompleted } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add task with automatic assignment
router.post('/addtasks', authMiddleware('Manager'), addTask);

// Get all tasks for a specific project
router.get('/projects/:projectId/tasks', authMiddleware(), getTasksForProject);

// Mark task as completed here manager as well as enginner can mark there task as complete
router.put('/tasks/:id/complete', authMiddleware(['Manager','Engineer']), markTaskAsCompleted);

module.exports = router;
