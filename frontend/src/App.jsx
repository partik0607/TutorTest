import "./App.css";
import Test4 from "./components/test/Test";
import ProtectedRoute from "./components/privatequiz";
import LoginSignup from "./Pages/Login";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import PrivateRoute from "./components/PrivateRoute";
import Showquiz from "./Pages/Showquiz/Showquiz";
// import Createquiz from './Pages/Create-quiz/Createquiz';
import Oldquiz from "./Pages/Old-Quiz/Oldquiz";
import Upcommingquiz from "./Pages/Upcomming-quiz/Upcommingquiz";
import CustomQuizProvider from "./context/Quiz-context"; // ✅ import provider
import QuestionBuilder from "./components/test/Test4";
import QuizForm from "./components/Quiz-setup/Quizsetup";
import TakeQuiz from "./components/TakeQuiz/TakeQuiz";
import TestLoginSignup from "./Pages/test/Testlogin";
import Allquiz from "./Pages/All-Quiz/Allquiz";
// function App() {
//   return (
//     <CustomQuizProvider> {/* ✅ Wrap entire app in context provider */}
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<LoginSignup/>} />
//           <Route path="/login" element={<LoginSignup/>} />
//           <Route path="/Home" element={<Home/>}/>
//           <Route path="/showquiz" element={<Showquiz/>}/>
//           <Route path="/create-quiz" element={<QuizForm/>} />
//           <Route path="/add-questions" element={<QuestionBuilder/>} />

//           <Route path="/prev-quiz" element={<Oldquiz />} />
//           <Route path="/upcomming-quiz" element={<Upcommingquiz />} />
//         </Routes>
//       </Router>
//     </CustomQuizProvider>
//   );
// }
function App() {
  return (
    <CustomQuizProvider>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/test-login" element={<TestLoginSignup />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/allquiz"
          element={
            <>
              <Navbar />
              <Allquiz />
            </>
          }
        />
        <Route
          path="/take-quiz/:quizId"
          element={
            <>
              <Navbar />
              <TakeQuiz />
            </>
          }
        />

        <Route
          path="/showquiz"
          element={
            <>
              <Navbar />
              <Showquiz />
            </>
          }
        />
        <Route
          path="/create-quiz"
          element={
            <>
              <Navbar />
              <QuizForm />
            </>
          }
        />
        <Route
          path="/add-questions"
          element={
            <>
              <Navbar />
              <QuestionBuilder />
            </>
          }
        />
        <Route
          path="/prev-quiz"
          element={
            <>
              <Navbar />
              <Oldquiz />
            </>
          }
        />
        <Route
          path="/upcomming-quiz"
          element={
            <>
              <Navbar />
              <Upcommingquiz />
            </>
          }
        />
      </Routes>
    </CustomQuizProvider>
  );
}
export default App;
