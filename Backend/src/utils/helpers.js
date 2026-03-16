// Utility functions can be placed here
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

module.exports = { formatDate };
