import React, { useContext } from 'react';
import './Oldquiz.css';
import { quizcontext } from '../../context/Quiz-context';
import Quiz from '../../components/Quiz/Quiz';
import { useNavigate } from 'react-router-dom';

function Oldquiz() {
  const { quiz } = useContext(quizcontext);
  const navigate =useNavigate();

  // Get today's date
  const today = new Date().toISOString().split('T')[0]; // Formats the date as YYYY-MM-DD

  // Filter quizzes that have an end date earlier than today
  console.log(quiz);
  const filteredQuizzes = quiz.filter(q => new Date(q.endDate) > new Date());
  const handleQuizClick = (quiz) => {
    // Navigate to the ShowQuiz page and pass the quiz data
    navigate('/showquiz', { state: { quizData: quiz } });
  };

  return (
    <div>
      {/* <div className="total-quiz">Total quizzes added: {len}</div> */}

      <div className="livequiz-container">
        {filteredQuizzes.map((q, i) => (
          <div className="quizbox" key={q.id} onClick={() => handleQuizClick(q)}>
            <Quiz quiz={{ ...q, index: i }} />
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default Oldquiz;
