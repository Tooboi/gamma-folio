const { Schema, model } = require('mongoose');

const promptSchema = new Schema({
  prompt: {
    type: String,
    required: true
  },
  solutions: [{
    type: Schema.Types.ObjectId,
    ref: 'Solution',
    required: false
  }]
}, {
  timestamps: true
});

const Prompt = model('Prompt', promptSchema);

module.exports = Prompt;
