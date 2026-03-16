const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a team name']
  },
  projectIdea: {
    type: String,
    required: [true, 'Please add a project idea']
  },
  hackathonName: {
    type: String,
    required: [true, 'Please add a hackathon name']
  },
  requiredSkills: {
    type: [String],
    default: []
  },
  membersNeeded: {
    type: Number,
    required: [true, 'Please specify the number of members needed']
  },
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  status: {
    type: String,
    enum: ['Open', 'Full', 'Completed'],
    default: 'Open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Team', teamSchema);
