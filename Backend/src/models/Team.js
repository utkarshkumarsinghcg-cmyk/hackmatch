const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, 'Please provide a team name'],
    trim: true,
    maxlength: [50, 'Team name cannot be more than 50 characters']
  },
  projectIdea: {
    type: String,
    required: [true, 'Please provide a project idea description'],
    maxlength: [500, 'Project idea cannot be more than 500 characters']
  },
  hackathonName: {
    type: String,
    required: [true, 'Please provide the target hackathon name'],
    trim: true
  },
  requiredSkills: {
    type: [String],
    required: [true, 'Please list at least one required skill'],
    default: []
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Team', teamSchema);
