import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { usermiddleware } from "./middlewares/usermiddleware";
import {Createroomschema, Createuserschema, Signinschema} from "@repo/common/types";
import prismaclient  from "@repo/db/client";

const app=express();
app.use(express.json())

app.post("/signup",async(req,res)=>{
    const parseddata=Createuserschema.safeParse(req.body) 
    if(!parseddata.success){
        res.json({
            message:"incorrect inputs"
        })
        return;
    }
    try{
      const user=  await prismaclient.users.create({
            data :{      
                email :parseddata.data?.username, 
                password:parseddata.data.password,
                name:parseddata.data.name,        
            }
        })
        res.json({
            userid:user.id
        })
    }catch(e){
        res.status(401).json({
            message:"user already exists"
        })
    }
   
})
app.post("/signin",async(req,res)=>{
    const parseddatadata=Signinschema.safeParse(req.body)

    if(!parseddatadata.success){
        res.json({
            message:"incorrect inputs"
        })
        return;
    }
    const user=await prismaclient.users.findFirst({
        where:{
          email:parseddatadata.data.username,
          password:parseddatadata.data.password  
        }
    })   
    if(!user){
        res.status(403).json({
            message:"user not exist"
        })
        return;
    }
       const token=jwt.sign({
        userid:user?.id
       },JWT_SECRET)

    res.json({
        message:token
    })
})

app.post("/create-room" ,usermiddleware,async (req,res)=>{
    const parseddata=Createroomschema.safeParse(req.body)

    if(!parseddata.success){
        res.json({
            message:"incorrect inputs"
        })
        return;
    }
    
    const userid=(req as any).userid ;
  try{

      const room= await prismaclient.rooms.create({
          data:{
              slug:parseddata.data.name,
              adminid:userid
            }
        })
        res.json({
            roomid:room.id
        })
    }catch(e){
        res.status(403).json({
            message:"room name already exist"
        })
    } 
   
})
app.get("/chats/:roomid",async (req,res)=>{
    try{

        const roomid=Number(req.params.roomid);
        
        const messages= await  prismaclient.chat.findMany({
            where:{
                roomid:roomid
            },
            orderBy:{
                id:"desc"
            },
            take:50,
            
        })
        res.json({
            messages
        })
    }catch(e){
        console.log(e)
        res.json({
            message:[]
        })
    }
})

app.get("/room/:slug",async (req,res)=>{
    const slug=req.params.slug;
    const room=await prismaclient.rooms.findFirst({
        where:{
            slug
        }
    })
    res.json({
        room
    })
})

app.listen(3001)