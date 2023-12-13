const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Declare the Schema of the Mongo model
var userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email!']
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  solutions: [{
    type: Schema.Types.ObjectId,
    ref: 'Solution',
    required: false
  }],
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Feedback',
    required: false
  }]
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

//Export the model
module.exports = User;