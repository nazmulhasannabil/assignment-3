const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

// Update job seeker profile
const updateProfile = async (req, res) => {
  try {
    const { bio, skills, resumeUrl } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        bio,
        skills: skills ? skills.split(',').map(skill => skill.trim()) : [],
        resumeUrl
      },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all jobs with optional filters
const getAllJobs = async (req, res) => {
  try {
    const { location, jobType } = req.query;
    
    let filter = {};
    
    if (location) {
      filter.location = new RegExp(location, 'i'); // Case insensitive search
    }
    
    if (jobType) {
      filter.jobType = jobType;
    }
    
    const jobs = await Job.find(filter)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Apply to job
const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if already applied
    const existingApplication = await Application.findOne({
      jobId,
      userId: req.user._id
    });
    
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }
    
    // Create application
    const application = await Application.create({
      jobId,
      userId: req.user._id
    });
    
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get applied jobs
const getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user._id })
      .populate({
        path: 'jobId',
        populate: {
          path: 'postedBy',
          select: 'name email'
        }
      })
      .sort({ createdAt: -1 });
    
    // Filter out applications where the job has been deleted
    const validApplications = applications.filter(application => application.jobId !== null);
    
    res.json(validApplications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  updateProfile,
  getAllJobs,
  getJobById,
  applyToJob,
  getAppliedJobs
};