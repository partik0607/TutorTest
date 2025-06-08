import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Showquiz.css";
import { quizcontext } from "../../context/Quiz-context";

const ShowQuiz = () => {
  const location = useLocation();
  const { quizData } = location.state || {};
  const { users } = useContext(quizcontext);

  const [usernames, setUsernames] = useState({}); // key: userId, value: username

  // Fetch username for each userId in submissions
  useEffect(() => {
    const fetchUsernames = async () => {
      const token = localStorage.getItem("auth-token");
      const userIds = quizData?.submissions.map((s) => s.user) || [];

      const newUsernames = {};

      await Promise.all(
        userIds.map(async (userId) => {
          if (!usernames[userId]) {
            try {
              const res = await fetch(
                `https://tutortest.onrender.com/api/v1/by-id?createdBy=${userId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                }
              );
              const data = await res.json();
              newUsernames[userId] = data.username || "Unknown";
            } catch (err) {
              console.error("Error fetching user", userId, err);
              newUsernames[userId] = "Error";
            }
          }
        })
      );

      setUsernames((prev) => ({ ...prev, ...newUsernames }));
    };

    if (quizData?.submissions?.length) fetchUsernames();
  }, [quizData]);

  if (!quizData) return <p>No quiz data available</p>;

  const totalattempts = quizData.submissions.length;

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
      <Link to={`/take-quiz/${quizData._id}`}>
        <button className="take-quiz-button">Take Quiz</button>
      </Link>

      <h2>Questions</h2>
      <div className="questions-container">
        <ul className="questions-list">
          {quizData.questions.map((q, i) => (
            <li key={i} className="question-item">
              <h4>{q.question}</h4>
              <ul className="options-list">
                {q.options.map((option, idx) => (
                  <li key={idx}>{option}</li>
                ))}
                <li className="Answer">Correct Answer: {q.correctAnswer}</li>
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
          <tbody>
            {quizData.submissions.map((submission) => (
              <tr key={submission._id}>
                <td>{usernames[submission.user] || "Loading..."}</td>
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
