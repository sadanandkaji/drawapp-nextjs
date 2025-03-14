import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";

const wss= new WebSocketServer({port:8080})

wss.on('connection', function connection(ws,request){

    const url=request.url;
    if(!url){
        return;
    }
    const queryparams=new URLSearchParams(url.split('?')[1]);
    const token=queryparams.get("token") as string
    const decoded=jwt.verify(token,JWT_SECRET) 
    if(typeof decoded == "string"){
        ws.close();
        return;
    }

    if(!decoded || !decoded.userid){
        ws.close()
        return;
    }

    ws.on("message", function message(data){
        ws.send("pong")
    })
})