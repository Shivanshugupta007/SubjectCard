const express = require('express');
const router = express.Router();
const {
  addSubject,
  subjectList
} = require('../controllers/subject-controller');

router.post('/flashcard', addSubject);
router.get('/get-subject', subjectList);

module.exports = router;
