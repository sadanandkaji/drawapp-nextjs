import { HTTP_BACKEND_URL } from "@/config";
import axios from "axios";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} 

export async function initdraw(canvas:HTMLCanvasElement,roomid:string,socket:WebSocket){
    const ctx=canvas.getContext("2d");
   
    let existingshapes : Shape[]=await getexistingshapes(roomid)
    if(!ctx){
        return;
    }

    socket.onmessage=(event)=>{
        const message=JSON.parse(event.data)
        if(message.type == "chat"){
            const parsedata=JSON.parse(message.message);
            existingshapes.push(parsedata.shape)
            clearcanvas(existingshapes,ctx,canvas)

        }
    }

    clearcanvas(existingshapes,ctx,canvas)
    ctx.lineWidth=1
    let clicked=false;
    let startx=0;
    let starty=0
   canvas.addEventListener("mousedown",(e)=>{
    clicked=true
    startx=e.clientX;
    starty=e.clientY
   }) 
   canvas.addEventListener("mouseup",(e)=>{
    clicked=false
    const width=e.clientX-startx;
    const height=e.clientY-starty;
    const shape : Shape={
        type:"rect",
        x:startx,
        y:starty,
        width:width,
        height:height
    }
    existingshapes.push(shape)
    socket.send(JSON.stringify({
        type:"chat",
        roomid:roomid,
        message:JSON.stringify({
            shape
        })

    }
    ))
   }) 
   canvas.addEventListener("mousemove",(e)=>{
    if(clicked){
        const width= e.clientX-startx
        const height= e.clientY-starty;
        clearcanvas(existingshapes,ctx,canvas)
        ctx.strokeStyle="rgba(255,255,255)"
        ctx.strokeRect(startx,starty,width,height)
    }
   }) 
}

function clearcanvas(existingshapes:Shape[], ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle="rgba(0,0,0)"
     ctx.fillRect(0,0,canvas.width,canvas.height);
     existingshapes.map((shapes)=>{
         if(shapes.type === "rect"){

             ctx.strokeStyle="rgba(255,255,255)"
             ctx.strokeRect(shapes.x,shapes.y,shapes.width,shapes.height)
            }
     })

}

 async function getexistingshapes(roomid:string){
  const response=await axios.get(`${HTTP_BACKEND_URL}/chats/${roomid}`)
  const messages=response.data.messages

 const shapes= messages.map((x:{message:string})=>{
    const messagedata=JSON.parse(x.message);
    return  messagedata.shape
  })
return shapes


}