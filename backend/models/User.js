import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  usertype:{type:String ,required :true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  quiz:{type:Array, required:false},
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
