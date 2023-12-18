const mongoose = require('mongoose');

mongoose.connect(
  // process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bubbleDB',
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gamma',
  // 'mongodb+srv://admin:XQH6WaK2znHMRs0j@cluster0.kshywty.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
