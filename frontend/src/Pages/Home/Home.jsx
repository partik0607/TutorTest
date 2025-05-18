import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { quizcontext } from '../../context/Quiz-context';
import Quiz from '../../components/Quiz/Quiz';

function Home() {
  const { quiz } = useContext(quizcontext);
  const navigate = useNavigate();

  
  const today = new Date().toISOString().split('T')[0]; // Formats the date as YYYY-MM-DD

  // Filter quizzes that have an end date earlier than today
  const user=localStorage.getItem('user-id');
  
  const filteredQuizzes = quiz.filter(q=>q.createdBy==user);
  // console.log(filteredQuizzes);
  const len = filteredQuizzes.length;
  const handleQuizClick = (quiz) => {
    // Navigate to the ShowQuiz page and pass the quiz data
    navigate('/showquiz', { state: { quizData: quiz } });
  };

  return (
    <div>
      <div className="total-quiz">Quizzes added: {len}</div>

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

export default Home;
