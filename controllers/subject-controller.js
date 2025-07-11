const Subject = require('../models/subject-model');
const SubjectFromHF = require('../utils/hugging-face-subject-API');

const addSubject = async (req, res) => {
  try {
    const { student_id, question, answer } = req.body;

    const subject = await SubjectFromHF(question);

    const newSubject = new Subject({
      studentId: student_id,
      question,
      answer,
      subject
    });

    await newSubject.save();

    res.json({ message: 'Flashcard added successfully', subject });
  } catch (err) {
    console.error('Error adding flashcard :', err.message);
    res.status(500).json({ error: 'Failed to add flashcard' });
  }
};

const subjectList = async (req, res) => {
  try {
    const { student_id, limit = 5 } = req.query;

    const subjectListing = await Subject.find({ studentId: student_id });

    const groupedBySubject = {};

    subjectListing.forEach(card => {
      if (!groupedBySubject[card.subject]) groupedBySubject[card.subject] = [];
      groupedBySubject[card.subject].push(card);
    });


    const shuffledArray = [];
    let index = 0;

    while (shuffledArray.length < limit) {
      const subjects = Object.keys(groupedBySubject);
      if (subjects.length === 0) break;

      let addedInThisRound = false;

      for (const subjectName of subjects) {
        const card = groupedBySubject[subjectName][index];
        if (card) {
          const { question, answer, subject } = card;
          shuffledArray.push({ question, answer, subject });
          addedInThisRound = true;

          if (shuffledArray.length === parseInt(limit)) break;
        }
      }

      if (!addedInThisRound) break;
      index++;
    }

    res.json(shuffledArray);
  } catch (err) {
    console.error('Error fetching flashcards:', err.message);
    res.status(500).json({ error: 'Failed to fetch flashcards' });
  }
};

module.exports = {addSubject, subjectList}
