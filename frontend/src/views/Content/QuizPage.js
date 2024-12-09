// QuizPage.js
import React, { useState } from 'react';
import textbookData from './TextbookData.js'; // Adjust path if needed

const QuizPage = ({ onBack }) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  // Extract something from textbookData for context
  // Chapter 1.1 mentions the CIA triad (Confidentiality, Integrity, Availability)
  // We'll ask the user: "What does the CIA triad stand for?"

  const handleSubmit = () => {
    const userAnswer = answer.trim().toLowerCase();
    if (userAnswer.includes('confidentiality') && userAnswer.includes('integrity') && userAnswer.includes('availability')) {
      setFeedback('Correct! The CIA triad stands for Confidentiality, Integrity, and Availability.');
    } else {
      setFeedback('Incorrect. The CIA triad stands for Confidentiality, Integrity, and Availability.');
    }
  };

  return (
    <div className="quiz-page">
      <h2>Test Me: Quick Quiz</h2>
      <p>
        From Chapter 1.1, we learned that cybersecurity is built on three fundamental principles known as the CIA triad.  
        Can you name what CIA stands for?
      </p>
      <input 
        type="text"
        placeholder="e.g. Confidentiality, Integrity, and Availability"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        style={{ marginBottom: '10px', display: 'block' }}
      />
      <button onClick={handleSubmit} style={{ marginRight: '10px' }}>Submit</button>
      <button onClick={onBack}>Back</button>
      {feedback && <p style={{ marginTop: '10px' }}>{feedback}</p>}
    </div>
  );
};

export default QuizPage;
