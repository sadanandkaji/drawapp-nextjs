import { WebSocketServer ,WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import Prismaclient from "@repo/db/client"

const wss= new WebSocketServer({port:8080})
interface User{
  userid:string,
  ws:WebSocket,
  rooms:string[],
}

const users:User[]=[]

function checkuser(token:string):string |null{
    try{

        const decoded=jwt.verify(token,JWT_SECRET)
        if(typeof decoded === "string"){
            return null;
        }
        if(!decoded || !decoded.userid ){
            return null;
        }
        return decoded.userid
    }catch(e){
        return null
    }
}
wss.on('connection', function connection(ws,request){

    const url=request.url;
    if(!url){
        return;
    }
    const queryparams=new URLSearchParams(url.split('?')[1]);
    const token=queryparams.get("token") as string
    const userid=checkuser(token)

    if(userid === null){
        ws.close()
        return null;
    }
    users.push( {
        userid,
        ws,
        rooms: [] 
    });
    
    ws.on("message", async function message(data){     
        let Parseddata;
        if (typeof data !== "string") {
          Parseddata = JSON.parse(data.toString());
        } else {
          Parseddata = JSON.parse(data); // {type: "join-room", roomId: 1}
        }
           
        if(Parseddata.type === "join-room"){
            const user=users.find(x=>(x.ws === ws))
            user?.rooms.push(Parseddata.roomid)
        }
        if(Parseddata.type === "leave-room"){
            const user=users.find(x=>(x.ws === ws ))
           if(!user){
            return;
           }
           user.rooms = user?.rooms.filter(x => x === Parseddata.room);

        }
        console.log(Parseddata);
        if(Parseddata.type === "chat"){
            const roomid=Parseddata.roomid;
            const message=Parseddata.message;
           await Prismaclient.chat.create({
                data:{
                    roomid:Number(roomid),
                    message,
                    userid
                }
            })
            users.forEach(user=>{
                if(user.rooms.includes(roomid)){
                    user.ws.send(JSON.stringify({
                        type:"chat",
                        message:message,
                        roomid
                    }))
                }
            })
        }

    })
   
})