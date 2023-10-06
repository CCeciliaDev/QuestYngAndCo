import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import questions from '../assets/questions';
import QuestionComponent from '../components/QuestionComponent';
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import '../styles/TestQuest.css';

function TestQuest() {
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [isFormError, setIsFormError] = useState(false);
  const [isQuestionError, setIsQuestionError] = useState(false);
  const [unansweredQuestionIndices, setUnansweredQuestionIndices] = useState([]);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [date, setDate] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const navigate = useNavigate();

  const handleAnswerOptionClick = (questionIndex, answerIndex) => {
    setIsQuestionError(false);
    setIsFormSubmitted(false); // Réinitialisez l'état isFormSubmitted
    setUserAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });

    const nextQuestion = questionIndex + 1;
    if (nextQuestion < questions.length) {
      const nextQuestionElement = document.getElementById(`question-${nextQuestion}`);
      if (nextQuestionElement) {
        nextQuestionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleScroll = () => {
    setShowScrollTopButton(window.pageYOffset > 400);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    setIsFormSubmitted(true);

    const newUnansweredQuestionIndices = userAnswers
      .map((answer, index) => (answer === null ? index : null))
      .filter(index => index !== null);

    setUnansweredQuestionIndices(newUnansweredQuestionIndices);
    setIsFormError(!nom || !prenom || !date);
    setIsQuestionError(newUnansweredQuestionIndices.length > 0);

    if(!isFormError && !isQuestionError && newUnansweredQuestionIndices.length === 0) {
        // Continuez le traitement et la navigation vers la page des résultats
        // ... (le reste de votre code)
    }
};

  
  
  // useEffect(() => {
  //   if (isFormSubmitted) {
  
  //     const scoresByCategory = questions.reduce((acc, question, index) => {
  //       const category = question.category;
  //       const answerIndex = userAnswers[index];
  //       if (answerIndex != null) {
  //         acc[category] = acc[category] || { totalPoints: 0, answerCounts: {} };
  //         const points = question.answerOptions[answerIndex].points || 0;
  //         acc[category].totalPoints += points;
          
  //         // Nous ajoutons 1 au compte de la catégorie et du niveau de réponse correspondants
  //         acc[category].answerCounts[answerIndex + 1] = (acc[category].answerCounts[answerIndex + 1] || 0) + 1;
  //       }
  //       return acc;
  //     }, {});
  
  //     // Pour chaque catégorie, nous vérifions si la somme des réponses 4, 5 et 6 est au moins 3
  //     Object.values(scoresByCategory).forEach(category => {
  //       category.schemaActif = 
  //         (category.answerCounts[4] || 0) + 
  //         (category.answerCounts[5] || 0) + 
  //         (category.answerCounts[6] || 0) >= 3;
  //     });
  
  //     const dateParts = date.split('-');
  //     const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

  //     navigate('/results', { state: { scoresByCategory, nom, prenom, date: formattedDate } });
  //   }
  
  // }, [isFormSubmitted, isFormError, isQuestionError, nom, prenom, date, questions, navigate]);
  
  useEffect(() => {
    if (isFormSubmitted && !isFormError && !isQuestionError) {
      const scoresByCategory = questions.reduce((acc, question, index) => {
        const category = question.category;
        const answerIndex = userAnswers[index];
        if ([3, 4, 5].includes(answerIndex)) {
          acc[category] = acc[category] || { totalPoints: 0, answerCounts: {} };
          const points = question.answerOptions[answerIndex].points || 0;
          acc[category].totalPoints += points;
          acc[category].answerCounts[answerIndex + 1] = (acc[category].answerCounts[answerIndex + 1] || 0) + 1;
        }
        return acc;
      }, {});

      // Pour chaque catégorie, nous vérifions si la somme des réponses 4, 5 et 6 est au moins 3
      Object.values(scoresByCategory).forEach(category => {
        category.schemaActif = 
          (category.answerCounts[4] || 0) + 
          (category.answerCounts[5] || 0) + 
          (category.answerCounts[6] || 0) >= 3;
      });

      const dateParts = date.split('-');
      const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

      navigate('/results', { state: { scoresByCategory, nom, prenom, date: formattedDate } });
    }
  }, [isFormSubmitted, isFormError, isQuestionError, nom, prenom, date, questions, navigate]);



  return (
    <div className='divTest'>
      <h1>Questionnaire des schémas de Young</h1>
      <div className='inputDiv'>
        <label htmlFor="prenom" className={`inputLabel ${isFormError && !prenom ? 'error' : ''}`}>Prénom du patient</label>
        <input 
          type="text" 
          id="prenom"
          value={prenom} 
          onChange={(e) => setPrenom(e.target.value)}
        />
        <label htmlFor="nom" className={`inputLabel ${isFormError && !nom ? 'error' : ''}`}>Nom du patient</label>
        <input 
          type="text" 
          id="nom"
          value={nom} 
          onChange={(e) => setNom(e.target.value)}
        />
        <label htmlFor="date" className={`inputLabel ${isFormError && !date ? 'error' : ''}`}>Date du Questionnaire</label>
        <input 
          type="date" 
          id="date"
          value={date} 
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className='question-section'>
        {questions.map((question, index) => (
          <QuestionComponent 
            key={index}
            question={question}
            userAnswers={userAnswers}
            onAnswer={handleAnswerOptionClick}
            questionIndex={index}
            isUnanswered={unansweredQuestionIndices.includes(index)}
          />
        ))}

        {isFormError && (
          <div className='alert'>
            Veuillez remplir les champs Nom, Prénom et Date.
          </div>
        )}
        {isQuestionError && (
          <div className='alert'>
            Veuillez répondre à toutes les questions.
          </div>
        )}
        <button onClick={handleSubmit} className="submit-button">
          Soumettre
        </button>
      </div>

      {showScrollTopButton && (
  <div onClick={scrollToTop} className="scroll-top-icon">
    <BsFillArrowUpCircleFill size={40} /> {/* Vous pouvez ajuster la taille si nécessaire */}
  </div>
)}

    </div>
  );
}

export default TestQuest;