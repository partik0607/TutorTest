import express from "express";
import mongoose from "mongoose";
import { getQuizzes, createQuiz ,getallquiz,getcreater, getallusers} from "../controllers/quizcontroler.js";
import { protect } from "../middleware/authmiddleware.js";
import Quiz from "../models/Quiz.js";
const router = express.Router();

router.post('/add-quiz',protect,createQuiz);
router.get('/allquizes',protect,getQuizzes);
router.get('/by-id',protect,getcreater);
router.get('/allusers',protect,getallusers);
// routes/quizRoutes.js
// router.get('/quiz/:id', async (req, res) => {
//     try {
//       const quiz = await Quiz.findById(req.params.id);
//       if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
//       res.json(quiz);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
router.get('/quiz/:quizId', async (req, res) => {
    const { quizId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: 'Invalid quiz ID format' });
    }
  
    try {
      const quiz = await Quiz.findById(quizId);
      if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
      res.json(quiz);
    } catch (err) {
      console.error('Error in GET /quiz/:id:', err); // ✅ log the error
      res.status(500).json({ message: 'Server error' });
    }
  });
// routes/quizRoutes.js
router.post('/submit/:quizId', async (req, res) => {
    try {
      const { quizId } = req.params;
      const { answers,id} = req.body;
      const quiz = await Quiz.findById(quizId);
  
      if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
  
      let score = 0;
      const ans=[];
      quiz.questions.forEach((q, index) => {
        console.log(q);
        ans.push({qusestion:q.qusestion,options:q.options,selectedoption:answers[index],correctAnswer:q.correctAnswer})
        if (q.correctAnswer === answers[index]) {
          score += 1;
        }
      });
      
      // Save submission
      console.log(ans);
      quiz.submissions.push({
        user:id,
        score,
        ans,
        submittedAt: new Date(),
      });
  
      await quiz.save();
      
  
      res.json({ message: 'Submission successful!', score });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
    
export default router;
