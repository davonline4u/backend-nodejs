import asynchandler from "express-async-handler";
import generateToken from "../util/jwt.js";
import user from "../models/userModel.js";

// @ desc Auth user/token
// route  POST /api/users/auth
// @Public 

const auth = asynchandler(async (req, res) => {
 
      const { phone, email,  }  = req.body

      const newUser = await user.findOne({email})
      
   
    if(newUser){
        
        generateToken(res, newUser._id)
        res.status(201).json({
            _id: user._id,
            phone: newUser.phone,
            email: newUser.email
        })
    }else{
        res.status(400);
        throw new Error(`Invalid file data`)
    } 

     
})


// @ desc Resgister User
// route  POST /api/users/user
// @Public 

const registerUser = asynchandler(async (req, res) => {
 
    const { name, phone, email,  }  = req.body
      
    const userExist = await user.findOne({email})
    
    if(userExist){
        res.status(400)
        throw new Error(`User already exist`)
    } 

    const newUser = await user.create({
        name,
        phone,
        email
    })
    if(newUser){
        
        generateToken(res, newUser._id)
        res.status(201).json({
            _id: user._id,
            name: newUser.name,
            phone: newUser.phone,
            email: newUser.email
        })
    }else{
        res.status(400);
        throw new Error(`Invalid file data`)
    } 
})

 
// @ desc Logout User
// route  POST /api/users/logout
// @Public 

const logoutUser = asynchandler(async (req, res) => {
 
    res.status(200).json({message: "Logout Successful"})
})


// @ desc Get User Profile
// route  GET /api/users/profile
// @Private

const getUserProfile = asynchandler(async (req, res) => {
 
    res.status(200).json({message: "user profile"})
})

// @ desc Update User Profile
// route  PUT /api/users/profile
// @Private

const updateUserProfile = asynchandler(async (req, res) => {
 
    res.status(200).json({message: "update user profile"})
})
export {
    auth,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}