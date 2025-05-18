import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  MaximumMarks: { type: Number, required: true },
  noOfQuestions: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    }
  ],
  submissions: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      ans:{},
      score: Number,
      submittedAt: Date,
    },
  ],
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
