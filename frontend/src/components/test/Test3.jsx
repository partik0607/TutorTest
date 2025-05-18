import React from "react";
import QuizForm from "../Quiz-setup/Quizsetup.jsx";

const Test3 = () => {
  const handleQuizSubmit = (quizData) => {
        
    console.log("Quiz Submitted:", quizData);
    // You can send this data to backend or store in local state
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <QuizForm onSubmit={handleQuizSubmit} />
    </div>
  );
};

export default Test3;
