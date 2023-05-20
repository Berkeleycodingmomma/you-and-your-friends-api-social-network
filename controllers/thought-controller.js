const { Thought, User, Reaction } = require('../models');
const {Types} = require('mongoose');

// Define the ThoughtController object, which contains methods for handling various API requests related to thoughts
const ThoughtController = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};