const userModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthController = {
    generateAccessToken:(user)=>{
        return jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin
        },process.env.JWT_ACCESS_KEY,{expiresIn:"2m"})
    },
    generateRefreshToken:(user)=>{
        return jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin
        },process.env.JWT_REFRESH_KEY,{expiresIn:"365d"})
    },
    registerUser: async(req,res)=>{
        try {
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
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
            if(!user){
                res.status(400).json({message:"user not found"});
            }
            else{
                const validPass = await bcrypt.compare(password, user.password);
                if(!validPass){
                    res.status(400).json({message:"wrong password"});
                }
                else{
                    const accessToken = AuthController.generateAccessToken(user);
                    const refreshToken = AuthController.generateRefreshToken(user);
                    res.cookie("refreshToken",refreshToken,{
                        httpOnly:true,
                        path:"/",
                        sameSite:"strict"
                    })
                    const {password,...infoUser}=user._doc;
                    res.status(200).json({...infoUser,accessToken});
                }
            }
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    },
}

module.exports = AuthController;