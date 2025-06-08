// src/context/Quiz-context.js
import React, { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
export const quizcontext = createContext(null);

const CustomQuizProvider = ({ children }) => {
  const [quiz, setquiz] = useState([]);
  const [Student, isStudent] = useState("False");
  const [users, setusers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const token = localStorage.getItem("auth-token");
      try {
        const response = await fetch(
          "https://tutortest.onrender.com/api/v1/allquizes",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          // console.log(data);

          setquiz(data); // Update the state with the fetched quizzes
          // console.log(quiz)
        } else {
          console.error("Failed to fetch quizzes", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    const fetchusers = async () => {
      const token = localStorage.getItem("auth-token");
      try {
        const response = await fetch(
          "https://tutortest.onrender.com/api/v1/allusers",
          {
            method: "GET",
            credentials: "include", // include cookies with the request
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          // console.log(data);

          setusers(Object.values(data)); // Update the state with the fetched quizzes
        } else {
          console.error("Failed to fetch users", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchusers();
    fetchQuizzes(); // Call the async function
    const user_type = localStorage.getItem("usertype");
    // console.log(users);
    console.log(user_type);
    if (user_type == "Student") {
      isStudent("True");
    }
  }, []);
  const onSubmit = (formData) => {
    // console.log(formData);
  };
  const onStartQuiz = async (input) => {
    const { topic, score, numberOfQuestions, startDate, lastDate, questions } =
      input;
    // console.log(input);

    const quizData = {
      topic,
      MaximumMarks: score, // ensure this is passed
      noOfQuestions: questions.length, // ensure this is passed
      startDate,
      endDate: lastDate, // ensure this is passed as endDate
      questions,
      answers: [],
      createdBy: localStorage.getItem("user-id"), // Ensure 'user-id' is stored in localStorage
    };

    try {
      const token = localStorage.getItem("auth-token"); // Retrieve token from localStorage
      if (!token) {
        alert("You need to be logged in to create a quiz.");
        return;
      }
      console.log(quizData);
      // Send the quiz data to the backend
      const response = await fetch(
        "https://tutortest.onrender.com/api/v1/add-quiz",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach the token
          },
          body: JSON.stringify(quizData),
          credentials: "include",
        }
      );

      // Check if the response is okay (status code 200-299)
      if (!response.ok) {
        throw new Error(
          "Failed to create quiz, server responded with status " +
            response.status
        );
      }

      const data = await response.json();

      if (data.success) {
        alert("Quiz created successfully!");
        // navigate("/home");
        // window.location.href = "/home";
         navigate("/home", { replace: true });
        // window.location.replace("/Home"); // Redirect to quiz list or another page
      } else {
        alert(data.errors || "Failed to create quiz");
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Something went wrong. Try again!");
    }
  };

  // console.log(quiz)
  console.log(users);
  return (
    <quizcontext.Provider
      value={{ quiz, setquiz, onSubmit, onStartQuiz, Student, users }}
    >
      {children}
    </quizcontext.Provider>
  );
};

export default CustomQuizProvider;
