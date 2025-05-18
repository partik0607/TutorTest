import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TakeQuiz.css';
function TakeQuiz() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await fetch(`https://tutortest.onrender.com/api/v1/quiz/${quizId}`);
      const data = await res.json();
      if(data)setQuiz(data);
    };

    fetchQuiz();
  }, [quizId]);

  const handleChange = (qIndex, answer) => {
    setAnswers({ ...answers, [qIndex]: answer });
  };
  const token=localStorage.getItem('auth-token');
  const userid=localStorage.getItem('user-id');
  const handleSubmit = async () => {
    // {console.log(answers)};
    const res = await fetch(`https://tutortest.onrender.com/api/v1/submit/${quizId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ answers,id:userid }),
    });

    const result = await res.json();
    alert(result.message || "Quiz submitted!");
  };

  if (!quiz) return <div>Loading...</div>;
  
  return (
    <div className="take-quiz-wrapper">
      <h2>{quiz.topic} hi</h2>
     
      {quiz.questions.map((q, idx) => (
        <div className="question-block" key={idx}>
          <p>{q.question}</p>
          {/* {console.log(q.question)};      */}
          {q.options.map((opt, i) => (
            <label className="option-label" key={i}>
              <input
                type="radio"
                name={`question-${idx}`}
                value={opt}
                onChange={() => handleChange(idx, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button className="submit-btn" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default TakeQuiz;
