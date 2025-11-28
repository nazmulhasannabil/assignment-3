const express = require('express');
const { getAllJobs, getJobById } = require('../controllers/jobSeekerController');

const router = express.Router();

// Public job listings (no authentication required)
router.get('/jobs', getAllJobs);
router.get('/jobs/:id', getJobById);

module.exports = router;