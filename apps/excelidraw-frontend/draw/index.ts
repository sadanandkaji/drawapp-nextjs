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
} |{
    type:"line";
    x1:number;
    x2:number;
    y1:number;
    y2:number;
} |{
    type:"triangle";
    x1:number;
    x2:number;
    y1:number;
    y2:number;
    x3:number;
    y3:number;
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
   let shape:Shape | null=null
    //@ts-ignore
    const tool=window.selectedtool
    if(tool == "rect"){
         shape={
            //@ts-ignore
            type:"rect",
            x:startx,
            y:starty,
            width:width,
            height:height
    }
 
    }else if(tool == "circle"){
         shape={
         type:"circle",
         centerX:startx + width / 2,
         centerY:starty + height / 2,
         radius:Math.hypot(width, height) / 2
        }
    }else if(tool == "line"){
        shape={
        type:"line",
        x1:startx,
        y1:starty,
        x2:e.clientX,
        y2:e.clientY
       }
    }else if(tool == "triangle"){
         shape={
            type:"triangle",
            x1:startx,
            y1:starty,
            x2:startx+width/2,
            y2:starty+height,
            x3:startx-width/2,
            y3:starty+height
        }
    }
    if(!shape){
        return
    }
   
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
        //@ts-ignore
        const tool=window.selectedtool
        if(tool== "rect"){
            ctx.strokeRect(startx,starty,width,height)
        }else if(tool== "circle"){
           
        const centerx = startx + width / 2;
        const centery = starty + height / 2;
        const radius = Math.hypot(width, height) / 2; 
        
        ctx.beginPath();
        ctx.arc(centerx, centery, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();

        }else if(tool == "line"){
            
            
            ctx.beginPath();
            ctx.moveTo(startx,starty);
            ctx.lineTo(e.clientX,e.clientY)
            ctx.stroke()
         
        }else if(tool == "triangle"){
            const x1 = startx, y1 = starty; // First point (top vertex)
            const x2 = startx + width / 2, y2 = starty + height; // Bottom-right vertex
            const x3 = startx - width / 2, y3 = starty + height; // Bottom-left vertex
        
            ctx.beginPath();
            ctx.moveTo(x1, y1); // Move to the first point
            ctx.lineTo(x2, y2); // Line to second point
            ctx.lineTo(x3, y3); // Line to third point
            ctx.closePath(); // Close path to form triangle
            ctx.stroke();         
        }
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
            }else if(shapes.type === "circle"){                 
            ctx.beginPath();
            ctx.arc(shapes.centerX, shapes.centerY, shapes.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            }else if(shapes.type == "line"){    
            ctx.beginPath();
            ctx.moveTo(shapes.x1,shapes.y1);
            ctx.lineTo(shapes.x2,shapes.y2)
            ctx.stroke()
            }else if(shapes.type == "triangle"){
                ctx.beginPath();
                ctx.moveTo(shapes.x1,shapes.y1); 
                ctx.lineTo(shapes.x2,shapes.y2); 
                ctx.lineTo(shapes.x3,shapes. y3); 
                ctx.closePath(); 
                ctx.stroke();      
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