const Leave = require('../models/Leave');

// Apply for leave
exports.applyLeave = async (req, res) => {
    const { leaveType, startDate, endDate } = req.body;
     //Validate required fields
     if (!leaveType || !startDate || !endDate) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const userId = req.user.id;  // Ensure req.user is populated by auth middleware

        const newLeave = new Leave({ user:userId, leaveType, startDate, endDate });
        await newLeave.save();
        res.status(201).json({ message: 'Leave applied successfully',leave: newLeave });
    } catch (error) {
        console.error('Error applying leave:', error); // Log error details
        res.status(500).json({ message: error.message });
    }
};

// Get all leaves
exports.getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate('user');
        res.json(leaves);
    } catch (error) {
        console.error('Error fetching leaves:', error); // Log error details
        res.status(500).json({ message: error.message });
    }
};

// Update leave status
exports.updateLeaveStatus = async (req, res) => {
    const { id } = req.params;  //Leave ID from the request params
    const { status } = req.body;  //// New status from the request body

    console.log(`Updating leave status for ID: ${id} to ${status}`); // Log the ID and status

    // Validate the status field
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }


    try {

        // Find leave by ID and update its status
        const updatedLeave = await Leave.findByIdAndUpdate(id, { status }, { new: true }); // Return the updated document
        if (!updatedLeave) {
            return res.status(404).json({ message: 'Leave not found' });
        }
        res.json(updatedLeave);
    } catch (error) {
        console.error('Error updating leave status:', error);
        res.status(500).json({ message: error.message });
    }
};
