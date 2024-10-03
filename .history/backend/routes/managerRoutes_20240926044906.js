const express = require('express');
const { getAllProjects } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const { applyLeave, getAllLeaves } = require('../controllers/leaveController');

const router = express.Router();

router.use(authMiddleware('Manager'));

router.get('/projects', getAllProjects);


//Leave route for manager Such that manageer can also apply for leave
router.post('/applyleaves', applyLeave);
router.get('/seeleaves', getAllLeaves);

module.exports = router;
