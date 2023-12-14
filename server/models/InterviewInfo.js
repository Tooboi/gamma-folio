const { Schema, model } = require('mongoose');

const interviewInfoSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  position: {
    type: String,
    required: false
  },
  subject: {
    type: String,
    required: false
  },
  prompt: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  resFeedback: {
    type: String,
    required: true
  },
  commFeedback: [{
    type: String,
    required: false
  }]
}, {
  timestamps: true
});

const InterviewInfo = model('InterviewInfo', interviewInfoSchema);

module.exports = InterviewInfo;
