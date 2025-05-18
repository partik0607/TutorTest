import React from 'react';
import Quiz from '../Quiz/Quiz';

function Test() {
  const quizData = [
    {
      id: 'q1',
      Title: 'JavaScript Basics',
      time: '30',
      start: '2025-04-20',
      end: '2025-04-30',
      score: 85,
      attempts: 10,
      averagescore: 78,
    },
    {
      id: 'q2',
      Title: 'React Fundamentals',
      time: '45',
      start: '2025-04-21',
      end: '2025-05-01',
      score: 90,
      attempts: 7,
      averagescore: 82,
    },
    {
      id: 'q3',
      Title: 'Node.js & Express',
      time: '40',
      start: '2025-04-22',
      end: '2025-05-02',
      score: 88,
      attempts: 5,
      averagescore: 80,
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Quizzes</h2>
      {quizData.map((quiz, index) => (
        <Quiz key={quiz.id} {...quiz} index={index} />
      ))}
    </div>
  );
}

export default Test;
