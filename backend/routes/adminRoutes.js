const express = require('express');
const { 
  getPendingEmployers,
  approveEmployer,
  rejectEmployer,
  getAllJobs,
  getAllApplications,
  getAllUsers,
  toggleUserBlock
} = require('../controllers/adminController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication and admin role
router.use(auth, authorize('admin'));

// Employer approval routes
router.get('/pending-employers', getPendingEmployers);
router.put('/approve-employer/:id', approveEmployer);
router.delete('/reject-employer/:id', rejectEmployer);

// Read-only routes
router.get('/jobs', getAllJobs);
router.get('/applications', getAllApplications);

// User management routes
router.get('/users', getAllUsers);
router.put('/toggle-block/:id', toggleUserBlock);

module.exports = router;