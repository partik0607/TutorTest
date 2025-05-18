import User from "../models/User.js";
import generateToken from "../config/genratetocken.js";
import bcrypt from "bcryptjs";

// Register user
export const getuser=async(req,res)=>{
        const users=await User.find();
        if(users){
            res.send(users);
        }else{
            res.status(400).send("error in fetching users");
        }
}
export const registerUser = async (req, res) => {
  const { username, email, password,usertype } = req.body;
  
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // console.log(req);
  const user = await User.create({ username,usertype, email, password: hashedPassword });
  
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      usertype:usertype,
      email: user.email,
      success:true,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Login user
export const authUser = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  // console.log(user);
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      username: user.username,
      usertype:user.usertype,
      email: user.email,
      success:true,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
