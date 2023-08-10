const express=require("express");
const {UserModel}=require("../model/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const userRouter=express.Router();

userRouter.post("/register", async (req,res)=>{
    const {email,password}=req.body;
    try{
        let check=await UserModel.find({email});
        if(check.length==0){
            bcrypt.hash(password,5, async(err,hash)=>{
                if(err){
                    console.log(err);
                }else{
                    const user= new UserModel({email,password:hash});
                    await user.save();
                    res.send("User Registered");
                }
            })
        }else{
            res.send("Please Login");
        }
    }
    catch(err){
        res.send({"err in reqistering": err});
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id},process.env.key);
                    res.send({"msg":"Login succesfull","token":token});
                }else{
                    res.send("Wrong Credentials");
                }
            })
        }else{
            res.send("Wrong Credentials");
        }
    }
    catch(err){
        res.send({"err in logging in": err});
    }
})

module.exports={userRouter};