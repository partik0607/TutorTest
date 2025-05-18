import User from "../models/User.js"
const getuser=async(req,res)=>{
        const users=await User.find();
        if(users){
            res.send(users);
        }else{
            res.status(400).send("error in fetching users");
        }
}
export default getuser;