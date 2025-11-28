const express = require('express');
const { 
  createJob,
  getEmployerJobs,
  getJobById,
  updateJob,
  deleteJob,
  getApplicants
} = require('../controllers/employerController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication and employer role
router.use(auth, authorize('employer'));

// Job routes
router.post('/jobs', createJob);
router.get('/jobs', getEmployerJobs);
router.get('/jobs/:id', getJobById);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

// Applicant routes
router.get('/jobs/:id/applicants', getApplicants);

module.exports = router;