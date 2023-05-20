const { Thought, User, Reaction } = require('../models');
const {Types} = require('mongoose');


const ThoughtController = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
          {_id:req.params.thoughtId},
          {$addToSet: {reactions: req.body}},
          {runValidators: true, new: true}
      );
      thought ? res.json(thought) : res.status(404).json({message: notFound});
  } catch (e) {
      res.status(500).json(e);
  }
},
async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
          {_id: req.params.thoughtId},
          {$pull: {reactions: {reactionId: req.params.reactionId}}},
          {runValidators: true, new: true}
      );

      thought ? res.json(thought) : res.status(404).json({message: notFound});
  } catch (e) {
      res.status(500).json(e);
  }
},

};
module.exports = ThoughtController;
