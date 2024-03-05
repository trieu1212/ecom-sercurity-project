const userModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthController = {
    generateAccessToken:(user)=>{
        return jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin
        },process.env.JWT_ACCESS_KEY,{expiresIn:"3d"})
    },
    registerUser: async(req,res)=>{
        const {username,email,password} = req.body;
        try {
            var salt = bcrypt.genSaltSync(10);
            var hashPassword = bcrypt.hashSync(password, salt);
            const newUser = new userModel({
                username:username,
                email:email,
                password:hashPassword
            })
            await newUser.save();
            res.status(200).json(newUser);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    },
    loginUser: async(req,res)=>{
        const {username,password} = req.body;
        try {
            const user = await userModel.findOne({username:username})
            if(user){
                bcrypt.compareSync("B4c0/\/", hash);
            }
            else{
                res.status(400).json({message:"user not found"});
            }
        } catch (error) {
            
        }
    },
}

module.exports = AuthController;