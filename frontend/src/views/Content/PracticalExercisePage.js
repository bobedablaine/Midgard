import React, { useState } from 'react';

const questions = [
  {
    question: 'What are the common Cyberattacks?',
    options: ['Phishing', 'Social Engineering Attacks', 'Ransomware', 'SQL Injection'], // SQL Injection is incorrect
    correctAnswer: 'SQL Injection',
  },
  {
    question: 'What are the elements of cyber security?',
    options: ['Application Security', 'Information Security', 'Network Security', 'SQL Injection'], // SQL Injection is incorrect
    correctAnswer: 'SQL Injection',
  },
  {
    question: 'Define DNS?',
    options: ['Domain Name Service', 'Domain Name System', 'Dynamic Network Service', 'Data Network Service'], // Correct is Domain Name System
    correctAnswer: 'Domain Name System',
  },
  {
    question: 'What is a Firewall?',
    options: ['A network security device', 'A virus detection tool', 'A malware removal tool', 'An encryption device'], // Correct is A network security device
    correctAnswer: 'A network security device',
  },
  {
    question: 'What is a VPN?',
    options: ['Virtual Protocol Network', 'Virtual Private Network', 'Verified Protocol Network', 'Verified Private Network'], // Correct is Virtual Private Network
    correctAnswer: 'Virtual Private Network',
  },
  {
    question: 'What is not a source of malware?',
    options: ['Worms', 'Adware', 'Trojan', 'Firewall'], // Firewall is incorrect
    correctAnswer: 'Firewall',
  },
  {
    question: 'How does email work?',
    options: [
      'SMTP communicates with DNS and receiver SMTP',
      'POP3 communicates directly with DNS',
      'IMAP uses FTP to send emails',
      'SMTP skips DNS for direct delivery', // Correct is the first
    ],
    correctAnswer: 'SMTP communicates with DNS and receiver SMTP',
  },
  {
    question: 'What is the difference between active and passive cyber attacks?',
    options: [
      'Active attacks modify data, passive attacks observe', // Correct
      'Passive attacks modify data, active attacks observe',
      'Both involve modifying data',
      'Both involve only observation',
    ],
    correctAnswer: 'Active attacks modify data, passive attacks observe',
  },
  {
    question: 'What is a social engineering attack?',
    options: [
      'Manipulating people for access', // Correct
      'Installing malware remotely',
      'Using trojans for data theft',
      'Bypassing firewalls directly',
    ],
    correctAnswer: 'Manipulating people for access',
  },
  {
    question: 'Who are black hat hackers and white hat hackers?',
    options: [
      'Black hat = Criminals, White hat = Ethical', // Correct
      'Black hat = Ethical, White hat = Criminals',
      'Both are ethical hackers',
      'Both are malicious hackers',
    ],
    correctAnswer: 'Black hat = Criminals, White hat = Ethical',
  },
];

const PracticalExercisePage = ({ onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const results = questions.map((question, index) => {
      const isCorrect = selectedAnswers[index] === question.correctAnswer;
      return {
        question: question.question,
        selectedAnswer: selectedAnswers[index] || 'No answer',
        correctAnswer: question.correctAnswer,
        isCorrect,
      };
    });
    setFeedback(results);
  };

  return (
    <div className="exercise-page">
      {!feedback ? (
        <div className="exercise-container">
          <h2>Practical Exercise: Multiple Choice</h2>
          <p>
            <strong>{currentQuestionIndex + 1}.</strong> {currentQuestion.question}
          </p>
          {currentQuestion.options.map((option, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <label>
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  onChange={() => handleOptionSelect(option)}
                  checked={selectedAnswers[currentQuestionIndex] === option}
                />
                {' '}{option}
              </label>
            </div>
          ))}
          <div style={{ marginTop: '20px' }}>
            {currentQuestionIndex > 0 && (
              <button onClick={handlePrevious} style={{ marginRight: '10px' }}>Previous</button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={handleNext}>Next</button>
            ) : (
              <button onClick={handleSubmit}>Submit</button>
            )}
          </div>
        </div>
      ) : (
        <div className="results-container">
          <h3>Results</h3>
          <div className="results-grid">
            {feedback.map((result, index) => (
              <div key={index} className="result-item">
                <p><strong>{index + 1}.</strong> {result.question}</p>
                <p>Your Answer: <span>{result.selectedAnswer}</span></p>
                <p>Correct Answer: <span>{result.correctAnswer}</span></p>
                <p>
                  {result.isCorrect ? (
                    <span style={{ color: 'green' }}>Correct</span>
                  ) : (
                    <span style={{ color: 'red' }}>Incorrect</span>
                  )}
                </p>
              </div>
            ))}
          </div>
          <button onClick={onBack}>Back to Main Menu</button>
        </div>
      )}
    </div>
  );  
};

export default PracticalExercisePage;

