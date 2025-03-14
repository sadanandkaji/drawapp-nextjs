import { NextFunction, Request, Response } from "express";
import  jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";


export function usermiddleware(req:Request,res:Response,next:NextFunction){
    const token=req.headers["authorization"] as string

    const decoded=jwt.verify(token ,JWT_SECRET) as JwtPayload
     
    if(decoded && typeof decoded.userid === "string"){
      (req as any).userid=decoded.userid
      next()
    }else{
        res.json({
            message:"unauthorized"
        })
    }
}