// PracticalExercisePage.js
import React, { useState } from 'react';
import textbookData from './TextbookData.js'; // Adjust path as needed

const PracticalExercisePage = ({ onBack }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // According to Chapter 1.2 (Common Cyber Threats), threats mentioned are:
  // Malware, Phishing, Ransomware, DDoS Attacks.
  // Let's add "SQL Injection" as an extra option not mentioned explicitly.
  
  const options = [
    'Malware',
    'Phishing',
    'Ransomware',
    'DDoS Attacks',
    'SQL Injection' // Not listed in Chapter 1.2 bullet points
  ];

  const handleSubmit = () => {
    if (selectedOption === 'SQL Injection') {
      setFeedback('Correct! SQL Injection was not listed in Chapter 1.2.');
    } else {
      setFeedback('Incorrect. Try again.');
    }
  };

  return (
    <div className="exercise-page">
      <h2>Practical Exercise: Multiple Choice</h2>
      <p>
        In Chapter 1.2, we explored common cyber threats. Which of the following was <strong>NOT</strong> mentioned?
      </p>
      {options.map((option, index) => (
        <div key={index} style={{ marginBottom: '8px' }}>
          <label>
            <input 
              type="radio" 
              name="threats" 
              value={option} 
              onChange={() => setSelectedOption(option)} 
              checked={selectedOption === option} 
            />
            {' '}{option}
          </label>
        </div>
      ))}
      <button onClick={handleSubmit} style={{ marginRight: '10px' }}>Submit</button>
      <button onClick={onBack}>Back</button>
      {feedback && <p style={{ marginTop: '10px' }}>{feedback}</p>}
    </div>
  );
};

export default PracticalExercisePage;
