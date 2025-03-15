import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { usermiddleware } from "./middlewares/usermiddleware";
import {Createroomschema, Createuserschema, Signinschema} from "@repo/common/types";
import { prismaclient } from "@repo/db/client";

const app=express();

app.post("/signup",(req,res)=>{
    const parseddata=Createuserschema.safeParse(req.body)
    // prismaclient.users.create({
    //     data:{
    //         username:parseddata.data?.username,
    //         password:parseddata.data?.password,
    //         name:parseddata.data?.name

    //     }
    // })

    if(!parseddata.success){
        res.json({
            message:"incorrect inputs"
        })
        return;
    }

    const username=req.body.username;
    const password=req.body.password;

    res.json({
        message:"signed in"
    })
})
app.post("/signin",(req,res)=>{
    const data=Signinschema.safeParse(req.body)

    if(!data.success){
        res.json({
            message:"incorrect inputs"
        })
        return;
    }
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
    const data=Createroomschema.safeParse(req.body)

    if(!data.success){
        res.json({
            message:"incorrect inputs"
        })
        return;
    }

    res.json({
    roomid:123
    })
})


app.listen(3001)