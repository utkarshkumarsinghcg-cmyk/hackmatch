const Team = require('../models/Team');
const { ApiError, asyncHandler } = require('../middleware/errorHandler');

// ----------------------------------------------------
// @desc    Create a new team
// @route   POST /api/teams
// @access  Private
// ----------------------------------------------------
const createTeam = asyncHandler(async (req, res, next) => {
  const { teamName, projectIdea, hackathonName, requiredSkills } = req.body;

  // Add the user making the request as createdBy
  const createdBy = req.user.id;

  // By default, the creator should probably also be a member of the team
  const members = [req.user.id];

  const team = await Team.create({
    teamName,
    projectIdea,
    hackathonName,
    requiredSkills,
    createdBy,
    members
  });

  res.status(201).json({
    success: true,
    data: team
  });
});

// ----------------------------------------------------
// @desc    Get all teams
// @route   GET /api/teams
// @access  Private (or Public, but as per request, routes protected)
// ----------------------------------------------------
const getAllTeams = asyncHandler(async (req, res, next) => {
  // Populate createdBy and members if needed
  const teams = await Team.find()
    .populate('createdBy', 'name email experienceLevel')
    .populate('members', 'name email experienceLevel');
    
  res.status(200).json({
    success: true,
    count: teams.length,
    data: teams
  });
});

// ----------------------------------------------------
// @desc    Get team by ID
// @route   GET /api/teams/:id
// @access  Private
// ----------------------------------------------------
const getTeamById = asyncHandler(async (req, res, next) => {
  const team = await Team.findById(req.params.id)
    .populate('createdBy', 'name email skills experienceLevel')
    .populate('members', 'name email skills experienceLevel');

  if (!team) {
    return next(new ApiError(`Team not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: team
  });
});

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById
};
