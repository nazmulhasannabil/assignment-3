const Job = require('../models/Job');
const Application = require('../models/Application');
const User = require('../models/User');

// Create job
const createJob = async (req, res) => {
  try {
    const { title, company, location, jobType, salaryRange, description } = req.body;
    
    const job = await Job.create({
      title,
      company,
      location,
      jobType,
      salaryRange,
      description,
      postedBy: req.user._id
    });
    
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all jobs posted by employer
const getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get job by ID (only if posted by employer)
const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({ 
      _id: req.params.id, 
      postedBy: req.user._id 
    });
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update job (only if posted by employer)
const updateJob = async (req, res) => {
  try {
    const { title, company, location, jobType, salaryRange, description } = req.body;
    
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, postedBy: req.user._id },
      { title, company, location, jobType, salaryRange, description },
      { new: true, runValidators: true }
    );
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete job (only if posted by employer)
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ 
      _id: req.params.id, 
      postedBy: req.user._id 
    });
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get applicants for a job
const getApplicants = async (req, res) => {
  try {
    // First check if job belongs to employer
    const job = await Job.findOne({ 
      _id: req.params.id, 
      postedBy: req.user._id 
    });
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Get applications for this job
    const applications = await Application.find({ jobId: req.params.id })
      .populate('userId', 'name email skills resumeUrl');
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createJob,
  getEmployerJobs,
  getJobById,
  updateJob,
  deleteJob,
  getApplicants
};