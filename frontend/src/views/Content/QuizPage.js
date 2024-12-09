import React, { useState } from 'react';

const questions = [
  {
    question: 'Which of these describes an ongoing pursuit by an individual/group?',
    correctAnswer: 'Stalking',
  },
  {
    question: 'Which one of the following is considered in the category of computer threats?',
    correctAnswer: 'DoS attack',
  },
  {
    question: 'Which of the following typically keeps tabs on every online activity the victim engages in, compiles all the data in the background, and sends it to a third party?',
    correctAnswer: 'Spyware',
  },
  {
    question: 'Which one is considered to be a type of antivirus program?',
    correctAnswer: 'All of the above',
  },
  {
    question: 'Which of these scanners for ports and IP addresses is most used by users?',
    correctAnswer: 'Angry IP Scanner',
  },
  {
    question: 'Which of the following phrases describes taking someone else\'s creation or idea and using it for one\'s own advantage?',
    correctAnswer: 'All of the above',
  },
  {
    question: 'Which of the following describes investigating moral conduct concerning the digital media landscape?',
    correctAnswer: 'Cyberethics',
  },
  {
    question: 'State whether True or False: Data encryption is used to ensure confidentiality.',
    correctAnswer: 'True',
  },
  {
    question: 'Determine the earliest method of free phone calls used by hackers.',
    correctAnswer: 'Phreaking',
  },
  {
    question: 'Which of the following statements best describes how the principle would be broken if a computer was no longer accessible?',
    correctAnswer: 'Availability',
  },
  {
    question: 'Which of these methods is used to check the validity of a message?',
    correctAnswer: 'Message Digest',
  },
  {
    question: 'Which of the following is typically used when hacking Wi-Fi?',
    correctAnswer: 'Aircrack-ng',
  },
  {
    question: 'Among the following, which is not a form of scanning?',
    correctAnswer: 'Cloud Scan',
  },
  {
    question: 'The Code Red is similar to a:',
    correctAnswer: 'Computer Virus',
  },
  {
    question: 'Which of these was the first antivirus software ever created?',
    correctAnswer: 'Reaper',
  },
];

const QuizPage = ({ onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (e) => {
    const { value } = e.target;
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: value,
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
      const userAnswer = (userAnswers[index] || '').trim();
      const isCorrect = userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();
      return {
        question: question.question,
        userAnswer: userAnswer || 'No answer',
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
          <h2>Quiz: Text Input Questions</h2>
          <p>
            <strong>{currentQuestionIndex + 1}.</strong> {currentQuestion.question}
          </p>
          <input
            type="text"
            placeholder="Type your answer here"
            value={userAnswers[currentQuestionIndex] || ''}
            onChange={handleAnswerChange}
            style={{ marginBottom: '10px', display: 'block', width: '100%', padding: '10px', borderRadius: '5px' }}
          />
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
          <h3>Quiz Results</h3>
          <div className="results-grid">
            {feedback.map((result, index) => (
              <div key={index} className="result-item">
                <p><strong>{index + 1}.</strong> {result.question}</p>
                <p>Your Answer: <span>{result.userAnswer}</span></p>
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
          <button onClick={onBack} style={{ marginTop: '20px' }}>Back to Main Menu</button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
