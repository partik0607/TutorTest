import Quiz from "../models/Quiz.js";
import User from "../models/User.js";
// Get all quizzes
export const getQuizzes = async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
};
 
export const getallquiz=async (req,res)=>{
  const storedquizes=await Quiz.find();
  if(storedquizes){
    res.send(storedquizes);
  }else{
    res.status(404).send(message="error in quiz fetching");
  }
};
export const getallusers=async (req,res)=>{
  const userid=req.body;
  const storedusers=await User.find();

  if(storedusers){
    res.send(storedusers);
  }else{
    res.status(404).send(message="error in quiz fetching");
  }
};



export const getcreater = async (req, res) => {
  const { createdBy } = req.query;

  try {
    const user = await User.findById(createdBy).select("username");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const { topic, MaximumMarks, noOfQuestions, startDate, endDate, questions, createdBy } = req.body;

    // Check if all required fields are present
    console.log(req.body);
    if (!topic || !MaximumMarks || !noOfQuestions || !startDate || !endDate || !questions || !createdBy) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new quiz
    const newQuiz = new Quiz({
      topic,
      MaximumMarks,
      noOfQuestions,
      startDate,
      endDate,
      questions,
      createdBy,
    });

    const savedQuiz = await newQuiz.save();

    const user = await User.findById(createdBy);
    console.log(user);
    user.quiz.push(savedQuiz);
    await user.save();
    return res.status(201).json({ success: true, quiz: savedQuiz });
  } catch (error) {
    console.error("Error creating quiz:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// const quizzes = await Quiz.create([
  
// ]);