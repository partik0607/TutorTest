import React, { useContext, useState } from "react";
import './Test4.css';
import { useLocation } from "react-router-dom";
import { quizcontext } from "../../context/Quiz-context";

const QuestionBuilder = () => {
  const { onStartQuiz } = useContext(quizcontext);
  const location = useLocation();
  const { quizData } = location.state;

  const [questions, setQuestions] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0);
  let mark=0;
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: "",
    marks:"",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctOption: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setCurrentQuestion((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };
  
  

  const addQuestion = () => {
    if (
      currentQuestion.questionText &&
      currentQuestion.marks &&
      currentQuestion.optionA &&
      currentQuestion.optionB &&
      currentQuestion.optionC &&
      currentQuestion.optionD &&
      currentQuestion.correctOption
    ) {
      setQuestions((prev) => [...prev, currentQuestion]);
      setTotalMarks((prev) => prev + Number(currentQuestion.marks));

      setCurrentQuestion({
        questionText: "",
        marks: 0,
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctOption: "",
      });
    } else {
      alert("Please fill all fields before adding the question!");
    }
  };

  const handleStartQuiz = () => {
    if (questions.length === 0) {
      alert("Add at least one question before starting the quiz!");
      return;
    }

    const formattedQuestions = questions.map((q) => ({
      question: q.questionText,
      options: [q.optionA, q.optionB, q.optionC, q.optionD],
      correctAnswer: q[`option${q.correctOption}`],
    }));

    const finalQuizData = {
      ...quizData,
      score: totalMarks, // Update score to totalMarks
      questions: formattedQuestions,
    };

    console.log(finalQuizData); // For debugging
    onStartQuiz(finalQuizData); // Send complete quiz data to backend
  };

  return (
    <div className="question-builder">
      <h2>Add Questions for {quizData?.topic || "..."}</h2>

      <div className="question-card">
        {/* All input fields */}
        <input
          type="text"
          name="questionText"
          placeholder="Enter Question Text"
          value={currentQuestion.questionText}
          onChange={handleChange}
          required
        />
        <input
          type="Number"
          name="marks"
          placeholder="Marks"
          value={currentQuestion.marks}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="optionA"
          placeholder="Option A"
          value={currentQuestion.optionA}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="optionB"
          placeholder="Option B"
          value={currentQuestion.optionB}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="optionC"
          placeholder="Option C"
          value={currentQuestion.optionC}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="optionD"
          placeholder="Option D"
          value={currentQuestion.optionD}
          onChange={handleChange}
          required
        />
        <select
          name="correctOption"
          value={currentQuestion.correctOption}
          onChange={handleChange}
          required
        >
          <option value="">Select Correct Option</option>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
          <option value="C">Option C</option>
          <option value="D">Option D</option>
        </select>

        <button type="button" onClick={addQuestion} className="add-question-button">
          ➕ Add Question
        </button>
      </div>

      <div className="questions-preview">
        <h3>Questions Added: {questions.length}</h3>
        {questions.map((q, idx) => (
          <div key={idx} className="preview-item">
            {idx + 1}. {q.questionText}
          </div>
        ))}
      </div>

      <button type="button" onClick={handleStartQuiz} className="start-quiz-button">
        Finish
      </button>
    </div>
  );
};

export default QuestionBuilder;
