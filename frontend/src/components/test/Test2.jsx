import React, { useState } from 'react';
import QuestionCard from '../Question/Question';
const questions = [
  {
    id: 0,
    question: 'Which of these are frontend frameworks?',
    options: ['React', 'Angular', 'Django', 'Vue']
  },
  {
    id: 1,
    question: 'Which are programming languages?',
    options: ['Python', 'HTML', 'CSS', 'Java']
  }
];

const Test2 = () => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, selectedOptions) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOptions }));
  };

  return (
    <div className="container">
      <h2>Take the Quiz</h2>
      {questions.map((q) => (
        <QuestionCard
          key={q.id}
          id={q.id}
          question={q.question}
          options={q.options}
          onChange={handleAnswerChange}
        />
      ))}

      <h4>Submitted Answers:</h4>
      <pre>{JSON.stringify(answers, null, 2)}</pre>
    </div>
  );
};

export default Test2;
