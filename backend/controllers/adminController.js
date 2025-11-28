const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

// Get pending employers
const getPendingEmployers = async (req, res) => {
  try {
    const employers = await User.find({ 
      role: 'employer', 
      isApproved: false 
    }).sort({ createdAt: -1 });
    
    res.json(employers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Approve employer
const approveEmployer = async (req, res) => {
  try {
    const employer = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }
    
    res.json(employer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reject employer
const rejectEmployer = async (req, res) => {
  try {
    const employer = await User.findByIdAndDelete(req.params.id);
    
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }
    
    res.json({ message: 'Employer rejected and removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all jobs (read-only)
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all applications (read-only)
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('userId', 'name email')
      .populate('jobId', 'title company')
      .sort({ createdAt: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Block/unblock user
const toggleUserBlock = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Prevent admin from blocking themselves
    if (user.role === 'admin' && user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot block yourself' });
    }
    
    user.isBlocked = !user.isBlocked;
    await user.save();
    
    res.json({
      message: user.isBlocked ? 'User blocked' : 'User unblocked',
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getPendingEmployers,
  approveEmployer,
  rejectEmployer,
  getAllJobs,
  getAllApplications,
  getAllUsers,
  toggleUserBlock
};