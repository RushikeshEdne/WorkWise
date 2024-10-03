const express = require('express');
const { getAllProjects } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const { applyLeave, getAllLeaves } = require('../controllers/leaveController');

const { addTask, getTasksForProject, markTaskAsCompleted } = require('../controllers/taskController');

const router = express.Router();

router.use(authMiddleware('Manager'));

router.get('/projects', getAllProjects);


//Leave route for manager Such that manageer can also apply for leave
router.post('/applyleaves', applyLeave);
router.get('/seeleaves', getAllLeaves);


// Add new task (or assign tasks)
//router.post('/projects/:projectId/tasks', authMiddleware('Manager'), addTask);

// Get tasks for a specific project
router.get('/projects/:projectId/tasks', authMiddleware('Manager'), getTasksForProject);

// Mark task as completed
router.put('/tasks/:id/complete', authMiddleware('Manager'), markTaskAsCompleted);

module.exports = router;
