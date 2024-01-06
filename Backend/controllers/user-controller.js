// Sign up  controller
// const User = require('../model/User');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
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
// Login route
const login = async(req,res,next) => {
    const {email,password} = req.body
let existingUser;
try{
    existingUser= await User.findOne({email:email});  
} catch(err) {
    return new Error(err);''
}
if(!existingUser){
   return res.status(404).send({message:"User not found ,Signup please"})
}
const isPassword = bcrypt.compare(password,existingUser.password);
if(!isPassword){
    return res.status(400).json({message:"Invalid email/password"})
}
// Generating token for user
const token = jwt.sign({id :existingUser._id}, process.env.JWT_Secret,{expiresIn:"35sec"} )
console.log("Generated token\n" ,token)
// if(req.cookies[`${existingUser._id}`]) {
//     req.cookies[`${existingUser._id}`] = ""
// }
if (req.cookies[`${existingUser._id}`]) {
    req.cookies[`${existingUser._id}`] = "";
  }

// Setting cookie
res.cookie(String(existingUser._id),token,{
    path:"/",
    expires:new Date (Date.now() + 1000 * 30),
    httpOnly:true,
    sameSite:'lax'
})
return res.status(200).send({message :"User successfully Loged in",user:existingUser,token})
}
// Middleware: It is a Bearer kind of token
const verifytoken = (req, res, next) => {
    // Extract the 'cookie' header from the request
    const cookies = req.headers.cookie;

    // Log the cookies for debugging purposes
    console.log(cookies); // Format of the cookie is (id=token)

    // Split the cookies into an array and extract the token value
    const token = cookies ? cookies.split("=")[1] : null;
    console.log(token);

    try {
        // Verify the token
        jwt.verify(token, process.env.JWT_Secret, (err, user) => {
            if (err) {
                // Check for TokenExpiredError and handle it separately
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: "Unauthorized - Token has expired" });
                } else {
                    // Handle other types of errors (e.g., invalid signature)
                    return res.status(400).json({ message: "Invalid Token" });
                }
            }

            // If verification is successful, set user id in the request and proceed to the next middleware
            req.id = user.id;
            next();
        });
    } catch (error) {
        // Handle any unexpected errors during token verification
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const getUser = async (req, res, next) => {
    const userId = req.id;
    let user;
    try {
      user = await User.findById(userId, "-password");
    } catch (err) {
      return new Error(err);
    }
    if (!user) {
      return res.status(404).json({ messsage: "User Not FOund" });
    }
    return res.status(200).json({ user });
  };
  const refreshToken = (req,res,next) => {
    const cookies = req.headers.cookie;
    console.log(cookies); // Format of the cookie is (id=token)
    // Split the cookies into an array and extract the token value
    const prevToken = cookies ? cookies.split("=")[1] : null;
    if(!prevToken) {
        return res.status(400).json({message:"couldn't find token"})
    }
    jwt.verify(String(prevToken),process.env.JWT_Secret,(err,user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({message:"Authentication failed"})
        }
        req.clearCookie(`$(user.id)`);
        req.cookies[`$(user.id)`] ='';
        const token =jwt.sign({id:user.id},JWT_Secret,{
            expiresIn:'35sec'
        })
        console.log("Regenerated token/n", token)
        res.cookie(String(user.id),token,{
            path:"/",
            expires:new Date (Date.now() + 1000 * 30),
            httpOnly:true,
            sameSite:'lax'
        })
        req.id=user.id
        next()
    })
  }
  const logout = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      res.clearCookie(`${user.id}`);
      req.cookies[`${user.id}`] = "";
      return res.status(200).json({ message: "Successfully Logged Out" });
    });
  };
exports.signup=signup;
exports.login=login;
exports.verifytoken=verifytoken;
exports.getUser=getUser;
exports.refreshToken= refreshToken;
exports.logout=logout;
