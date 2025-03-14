import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { usermiddleware } from "./middlewares/usermiddleware";

const app=express();

app.post("/signup",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    res.json({
        message:"signed in"
    })
})
app.post("/signin",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
       
    const userid=1
       const token=jwt.sign({
        userid
       },JWT_SECRET)

    res.json({
        message:token
    })
})

app.post("/create-room" ,usermiddleware,(req,res)=>{

    res.json({
    roomid:123
    })
})


app.listen(3001)