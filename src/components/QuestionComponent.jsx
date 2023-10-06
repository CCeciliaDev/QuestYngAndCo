import PropTypes from 'prop-types';
import '../styles/QuestionComponent.css';

function QuestionComponent({
  question,
  userAnswers,
  onAnswer,
  questionIndex,
  isUnanswered,
}) {
  return (
    <div id={`question-${questionIndex}`}>
      <div className='question-count'>
        {/* <span>Question {questionIndex + 1}</span>/{questions.length} */}
      </div>
      <div
        className='question-text'
        style={{ color: isUnanswered ? 'red' : 'inherit' }}
      >
        {question.questionText}
      </div>
      <div className='answer-section'>
        {question.answerOptions.map((answerOption, index) => (
          <button
            key={index}
            onClick={() => onAnswer(questionIndex, index)}
            className={`button ${
              userAnswers[questionIndex] === index ? 'selected-answer' : ''
            }`}
          >
            {answerOption.answerText}
          </button>
        ))}
      </div>
    </div>
  );
}

QuestionComponent.propTypes = {
  question: PropTypes.shape({
    questionText: PropTypes.string.isRequired,
    answerOptions: PropTypes.arrayOf(
      PropTypes.shape({
        answerText: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.number),
  onAnswer: PropTypes.func.isRequired,
  questionIndex: PropTypes.number.isRequired,
  isUnanswered: PropTypes.bool.isRequired,
};

export default QuestionComponent;
