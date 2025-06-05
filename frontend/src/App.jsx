import './App.css';
import Test4 from './components/test/Test';
import ProtectedRoute from './components/privatequiz';
import LoginSignup from './Pages/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import PrivateRoute from './components/PrivateRoute';
import Showquiz from './Pages/Showquiz/Showquiz';
// import Createquiz from './Pages/Create-quiz/Createquiz';
import Oldquiz from './Pages/Old-Quiz/Oldquiz';
import Upcommingquiz from './Pages/Upcomming-quiz/Upcommingquiz';
import CustomQuizProvider from './context/Quiz-context'; // ✅ import provider
import QuestionBuilder from './components/test/Test4';
import QuizForm from './components/Quiz-setup/Quizsetup';
import TakeQuiz from './components/TakeQuiz/TakeQuiz';
import TestLoginSignup from './Pages/test/Testlogin';
import Allquiz from './Pages/All-Quiz/Allquiz';
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
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/test-login" element={<TestLoginSignup />} />

          {/* Protected Routes */}
          <Route
            path="/Home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
            <Route
            path="/allquiz"
            element={
              <PrivateRoute>
                <Allquiz />
              </PrivateRoute>
            }
          />
         <Route
         
  path="/take-quiz/:quizId"
  element={
    <ProtectedRoute>
      <TakeQuiz />
    </ProtectedRoute>
  }
/>


          <Route
            path="/showquiz"
            element={
              <PrivateRoute>
                <Showquiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-quiz"
            element={
              <PrivateRoute>
                <QuizForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-questions"
            element={
              <PrivateRoute>
                <QuestionBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/prev-quiz"
            element={
              <PrivateRoute>
                <Oldquiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/upcomming-quiz"
            element={
              <PrivateRoute>
                <Upcommingquiz />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </CustomQuizProvider>
  );
}
export default App;
