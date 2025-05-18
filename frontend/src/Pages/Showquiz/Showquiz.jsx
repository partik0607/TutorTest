import {React,useContext} from 'react';
import { useLocation } from 'react-router-dom';
import './ShowQuiz.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import { quizcontext } from '../../context/Quiz-context';

const ShowQuiz = () => {
  const location = useLocation();
  const { quizData } = location.state || {}; // Destructure quiz data from state
  const users = useContext(quizcontext).users;
console.log(users);
  const getUserName=(userId)=>{
    console.log(userId);
    const user = users.find(user => user._id === userId);
    
    if(user){
      console.log(user.username);
      return user.username;
      }
  }



  if (!quizData) {
    return <p>No quiz data available</p>;
  }
  const totalattempts=quizData.submissions.length;
  
  // console.log(quizData);

  return (
    <div className="showquiz-container">
      <div className="showquiz-header">
        <h1>{quizData.topic}</h1>
      </div>
      <div className="showquiz-details">
        <p><strong>Maximum Marks:</strong> {quizData.MaximumMarks}</p>
        <p><strong>Number of Questions:</strong> {quizData.questions.length}</p>
        <p><strong>No of attempts:</strong> {totalattempts}</p>
        <p><strong>Start Date:</strong> {new Date(quizData.startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(quizData.endDate).toLocaleDateString()}</p>
      </div>
      <Link to={`/take-quiz/${quizData._id}`}><button className="take-quiz-button">Take Quiz</button>
  </Link>
      <h2>Questions</h2>
<div className="questions-container">
  <ul className="questions-list">
    {quizData.questions.map((question, index) => (
      <li key={index} className="question-item">
        <h4>{question.question}</h4>
        <ul className="options-list">
          {question.options.map((option, idx) => (
            <li key={idx}>{option}</li>
          ))}
          <li className='Answer'>Correct Answer: {question.correctAnswer}</li>
        </ul>
      </li>
    ))}
  </ul>
</div>
    <h2>Submissions</h2>
<div className="submissions-container">
  <table className="submissions-table">
    <thead>
      <tr>
        <th>Submitted By</th>
        <th>Score</th>
        <th>Out Of</th>
      </tr>
    </thead>
    {/* <tbody>
      {quizData.submissions.map((submission) => (
        <tr key={submission._id}>
          <td>{submission.user}</td>
          <td>{submission.score}</td>
          <td>{quizData.MaximumMarks}</td>
        </tr>
      ))}
    </tbody> */}
    <tbody>
  {quizData.submissions.map((submission) => (
    <tr key={submission._id}>
      <td>{getUserName(submission.user)}</td>
      <td>{submission.score}</td>
      <td>{quizData.MaximumMarks}</td>
    </tr>
  ))}
</tbody>

  </table>
</div>

    </div>
  );
};

export default ShowQuiz;
