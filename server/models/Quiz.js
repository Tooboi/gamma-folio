const { Schema, model } = require('mongoose');

const quizSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  prompts: [{
    type: Schema.Types.ObjectId,
    ref: 'Prompt',
    required: false
  }]
}, {
  timestamps: true
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
