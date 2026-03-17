const express = require('express');
const {
  requestToJoinTeam,
  respondToJoinRequest
} = require('../controllers/joinRequestController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, requestToJoinTeam);

router.route('/:id')
  .put(protect, respondToJoinRequest);

module.exports = router;
