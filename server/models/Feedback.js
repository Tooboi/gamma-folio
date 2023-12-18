const { Schema, model } = require('mongoose');

const feedbackSchema = new Schema({
  thoughts: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  solutionId: {
    type: Schema.Types.ObjectId,
    ref: 'Solution',
    required: false
  },
  interviewInfoId: {
    type: Schema.Types.ObjectId,
    ref: 'InterviewInfo',
    required: false
  }
}, {
  timestamps: true
});

const Feedback = model('Feedback', feedbackSchema);

module.exports = Feedback;
