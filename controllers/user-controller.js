// Sign up  controller
// const User = require('../model/User');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
 const signup = async(req,res,next) => {
    const {name,email,password} =req.body;
    let existingUser;
    try{
        existingUser= await User.findOne({email:email});
    } catch(err) {
        console.log(err);
    }
    if (existingUser) {
        return res.status(400).send({message:"User is already created ,login instead"})
    }
    const saltRounds = 10; 
    const hashedPassword  = await bcrypt.hash(password,saltRounds);
    const user = new User ({
        name, // Es6 update if name:name we write name only
        email,
        password:hashedPassword,
    }); 
 try {
    await user.save();
 } catch(err) {
    console.log(err);
 }
 return res.status(201).json({message:user})
}
exports.signup=signup