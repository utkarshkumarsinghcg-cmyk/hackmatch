const express = require('express');
const {
  createTeam,
  getAllTeams,
  getTeamById
} = require('../controllers/teamController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createTeam)
  .get(protect, getAllTeams);

router.route('/:id')
  .get(protect, getTeamById);

module.exports = router;
