const { Schema, model } = require('mongoose');

const solutionSchema = new Schema({
  response: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  promptId: {
    type: Schema.Types.ObjectId,
    ref: 'Prompt',
    required: false
  },
  feedback: [{
    type: Schema.Types.ObjectId,
    ref: 'Feedback',
    required: false
  }]
}, 
{
  timestamps: true,
});

const Solution = model('Solution', solutionSchema);

module.exports = Solution;
