import { useState } from 'react';

function TestQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      questionText: "Quelle est la capital de la France?",
      answerOptions: [
        { answerText: "Paris", isCorrect: true },
        { answerText: "Lyon", isCorrect: false },
        // ... Autres options
      ],
    },
    // ... Autres questions
  ];
  

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className='quiz'>
      {showScore ? (
        <div className='score-section'>
          Vous avez marqué {score} sur {questions.length} points!
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='question-text'>{questions[currentQuestion].questionText}</div>
          </div>
          <div className='answer-section'>
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)} key={index}>
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </>
      )}

<div>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
        <p>XXX</p>
      </div>
    </div>

    
  );
}

export default TestQuiz;
