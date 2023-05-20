const { User } = require('../models');

const UserController = {
  // 1. Get all users
  getAllUsers(req, res) {
    User.find({})
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },
};