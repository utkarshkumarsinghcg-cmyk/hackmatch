const JoinRequest = require('../models/JoinRequest');
const Team = require('../models/Team');
const { ApiError, asyncHandler } = require('../middleware/errorHandler');

// ----------------------------------------------------
// @desc    Request to join a team
// @route   POST /api/join-requests
// @access  Private
// ----------------------------------------------------
const requestToJoinTeam = asyncHandler(async (req, res, next) => {
  const { teamId } = req.body;
  const userId = req.user.id;

  if (!teamId) {
    return next(new ApiError('Please provide a teamId', 400));
  }

  // Validate that the team exists
  const team = await Team.findById(teamId);
  if (!team) {
    return next(new ApiError('Team not found', 404));
  }

  // Check if the user is already a member of the team
  if (team.members.includes(userId)) {
    return next(new ApiError('You are already a member of this team', 400));
  }

  // Check if the user has already sent a request to this team
  const existingRequest = await JoinRequest.findOne({ user: userId, team: teamId });
  if (existingRequest) {
    return next(new ApiError(`You have already requested to join this team. Status: ${existingRequest.status}`, 400));
  }

  // Create the join request
  const joinRequest = await JoinRequest.create({
    user: userId,
    team: teamId
  });

  res.status(201).json({
    success: true,
    data: joinRequest
  });
});

// ----------------------------------------------------
// @desc    Accept or reject a join request
// @route   PUT /api/join-requests/:id
// @access  Private
// ----------------------------------------------------
const respondToJoinRequest = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (!['accepted', 'rejected'].includes(status)) {
    return next(new ApiError('Invalid status. Must be accepted or rejected', 400));
  }

  const joinRequest = await JoinRequest.findById(req.params.id).populate('team');

  if (!joinRequest) {
    return next(new ApiError('Join request not found', 404));
  }

  // Ensure only the team creator can respond to join requests
  if (joinRequest.team.createdBy.toString() !== req.user.id) {
    return next(new ApiError('Not authorized to respond to requests for this team', 403));
  }

  // If the request was already accepted, user might already be in team
  if (joinRequest.status === 'accepted' || joinRequest.status === 'rejected') {
    return next(new ApiError(`This request has already been ${joinRequest.status}`, 400));
  }

  // Update status
  joinRequest.status = status;
  await joinRequest.save();

  // If accepted, add the user to the team's members array
  if (status === 'accepted') {
    const team = await Team.findById(joinRequest.team._id);
    if (!team.members.includes(joinRequest.user)) {
      team.members.push(joinRequest.user);
      await team.save();
    }
  }

  res.status(200).json({
    success: true,
    data: joinRequest
  });
});

module.exports = {
  requestToJoinTeam,
  respondToJoinRequest
};
