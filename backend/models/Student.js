import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  quiz:{type:Array, required:false},
}, { timestamps: true });

const Student = mongoose.model("Student", StudentSchema);
export default Student;