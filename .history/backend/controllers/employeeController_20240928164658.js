const User = require('../models/User');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await User.find({ role: { $in: ['Engineer', 'Manager'] } });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new employee
exports.addEmployee = async (req, res) => {
    const { name, email, password,role = 'Engineer' } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newEmployee = new User({ name, email, password: hashedPassword, role, currentWorkload: 0, performanceRating: 0,activeProjects: []});
        await newEmployee.save();
        res.status(201).json({ message: 'Employee added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update employee details
exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedEmployee = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
