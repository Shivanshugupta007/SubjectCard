const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  studentId: String,
  question: String,
  answer: String,
  subject: String
});

module.exports = mongoose.model('Subject', subjectSchema);
