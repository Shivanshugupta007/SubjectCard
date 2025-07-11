const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected Successfully');
  } catch (error) {
    console.error('Error Connecting To DB ', error.message);
  }
};

module.exports = connectDB;
