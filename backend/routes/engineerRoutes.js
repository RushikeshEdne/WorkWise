const express = require('express');
const { applyLeave, getAllLeaves } = require('../controllers/leaveController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware('Engineer'));

router.post('/leaves', applyLeave);
router.get('/leaves', getAllLeaves);



module.exports = router;
