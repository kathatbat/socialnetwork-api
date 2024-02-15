const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Thought = require('../models/thoughts.js');

router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    // thought.reactions.create(req.body);
    // await thought.save();
    res.status(201).json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    const reactionIndex = thought.reactions.findIndex(reaction => reaction._id == req.params.reactionId);
    if (reactionIndex === -1) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    thought.reactions.splice(reactionIndex, 1);
    await thought.save();
    res.json({ message: 'Reaction removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.friends.includes(req.params.friendId)) {
      return res.status(400).json({ message: 'Friend already exists in the user\'s friend list' });
    }
    user.friends.push(req.params.friendId);
    await user.save();
    res.json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const friendIndex = user.friends.indexOf(req.params.friendId);
    if (friendIndex === -1) {
      return res.status(404).json({ message: 'Friend not found in the user\'s friend list' });
    }
    user.friends.splice(friendIndex, 1);
    await user.save();
    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
