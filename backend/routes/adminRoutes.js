const express = require('express');
const { getAllEmployees, addEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const { addProject, updateProject, deleteProject } = require('../controllers/projectController');
const { applyLeave, updateLeaveStatus } = require('../controllers/leaveController'); // Include your leave controller
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware('Admin'));

// Employee routes
router.get('/employees', getAllEmployees);
router.post('/employees', addEmployee);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

// Project routes
router.post('/projects', addProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);


// Leave routes i.e only admin can approve,reject leave
router.put('/leaves/:id/status', updateLeaveStatus); // Update leave status route

module.exports = router;
