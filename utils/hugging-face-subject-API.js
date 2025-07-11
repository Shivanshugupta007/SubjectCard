
const axios = require('axios');
const DefautSubject = require('./default-subject')
require('dotenv').config();

async function SubjectFromHF(question) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
      {
        inputs: question,
        parameters: {
          candidate_labels: [
            "Physics", "Chemistry", "Biology", 
            "Mathematics", "History", "Geography",
            "Literature", "Computer Science"
          ]
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000
      }
    );

    const result = response.data;
    if (result && result.labels && result.scores) {
      const highestScoreIndex = result.scores.indexOf(Math.max(...result.scores));
      return result.labels[highestScoreIndex];
    }
    return DefautSubject(question);;
  } catch (err) {
    console.error('Hugging Face error:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    });
    return DefautSubject(question);
  }
}

module.exports = SubjectFromHF;