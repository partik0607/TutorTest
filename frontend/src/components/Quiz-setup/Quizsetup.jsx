import React, { useContext, useState } from "react";
import "./Quizsetup.css";
import { quizcontext } from "../../context/Quiz-context";
import { useNavigate } from "react-router-dom";

const QuizForm = () => {
  const navigate=useNavigate();
  const {onSubmit}=useContext(quizcontext);
  const [quizData, setQuizData] = useState({
    topic: "",
    startDate: "",
    lastDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear specific error
  };

  const validate = () => {
    let newErrors = {};

    const start = new Date(quizData.startDate);
    const last = new Date(quizData.lastDate);

    if (!quizData.topic.trim()) newErrors.topic = "Topic is required.";
    // if (!quizData.score) newErrors.score = "Score is required.";
    // if (!quizData.numberOfQuestions) newErrors.numberOfQuestions = "Number of questions is required.";
    if (!quizData.startDate) newErrors.startDate = "Start date is required.";
    if (!quizData.lastDate) newErrors.lastDate = "Last date is required.";

    if (quizData.startDate && quizData.lastDate && start > last) {
      newErrors.startDate = "Start date must be before last date.";
      newErrors.lastDate = "Last date must be after start date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit(quizData);
    navigate("/add-questions", { state: { quizData } });
  };
  const addQuestion=()=>{
    
  }

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
      <h2 className="quiz-form-title">Create a Quiz</h2>

      <div className="quiz-form-group">
        <label>Quiz Topic</label>
        <input
          type="text"
          name="topic"
          value={quizData.topic}
          onChange={handleChange}
          className={errors.topic ? "input-error" : ""}
          placeholder="Enter quiz topic"
          required
        />
        {errors.topic && <p className="error-text">{errors.topic}</p>}
      </div>

      {/* <div className="quiz-form-group">
        <label>Score</label>
        <input
          type="number"
          name="score"
          value={quizData.score}
          onChange={handleChange}
          className={errors.score ? "input-error" : ""}
          placeholder="Enter total score"
          required
        />
        {errors.score && <p className="error-text">{errors.score}</p>}
      </div>

      <div className="quiz-form-group">
        <label>Number of Questions</label>
        <input
          type="number"
          name="numberOfQuestions"
          value={quizData.numberOfQuestions}
          onChange={handleChange}
          className={errors.numberOfQuestions ? "input-error" : ""}
          placeholder="Enter number of questions"
          required
        />
        {errors.numberOfQuestions && <p className="error-text">{errors.numberOfQuestions}</p>}
      </div> */}

      <div className="quiz-form-group">
        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={quizData.startDate}
          onChange={handleChange}
          className={errors.startDate ? "input-error" : ""}
          required
        />
        {errors.startDate && <p className="error-text">{errors.startDate}</p>}
      </div>

      <div className="quiz-form-group">
        <label>Last Date to Attempt</label>
        <input
          type="date"
          name="lastDate"
          value={quizData.lastDate}
          onChange={handleChange}
          className={errors.lastDate ? "input-error" : ""}
          required
        />
        {errors.lastDate && <p className="error-text">{errors.lastDate}</p>}
      </div>

      <button type="submit"   className="quiz-form-button">
        Create
      </button>
    </form>
  );
};

export default QuizForm;
