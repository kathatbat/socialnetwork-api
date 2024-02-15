const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
  {
    reactionBody: {
      type: String,
      required: false,
      maxlength: 280
    },
    thoughtAuthor: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  },
  thoughtAuthor: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});

function dateFormat(timestamp) {
  return new Date(timestamp).toISOString();
}

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;

const Reaction = mongoose.model('Reaction', reactionSchema);
module.exports = Reaction;