const express = require('express');
const { 
  updateProfile,
  getAllJobs,
  getJobById,
  applyToJob,
  getAppliedJobs
} = require('../controllers/jobSeekerController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication and job seeker role
router.use(auth, authorize('jobseeker'));

// Profile routes
router.put('/profile', updateProfile);

// Job routes
router.get('/jobs', getAllJobs);
router.get('/jobs/:id', getJobById);
router.post('/apply', applyToJob);
router.get('/applied-jobs', getAppliedJobs);

module.exports = router;