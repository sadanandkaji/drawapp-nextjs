
import { initdraw } from "@/draw"
import { useEffect, useRef, useState } from "react"
import { Iconbutton } from "./iconbutton";
import { Circle,PenLineIcon, RectangleHorizontalIcon, Text, Triangle } from "lucide-react";


type shape=  "circle" | "rect" | "line" | "triangle" |"text"
export function Canvas({roomid,socket}:{roomid:string ,socket:WebSocket}){

     const canvasref=useRef<HTMLCanvasElement>(null)
     const [selectedtool,setselectedtool]=useState<shape>("line")

     useEffect(()=>{
      //@ts-ignore
       window.selectedtool=selectedtool;
     },[selectedtool])
     useEffect(() => {
      const interval = setInterval(() => {
        if (canvasref.current) {
          initdraw(canvasref.current, roomid, socket);
          clearInterval(interval);
        }
      }, 100); 
    
      return () => clearInterval(interval);
    }, [canvasref]);
          return <div style={{
            height:"100vh",
            overflow:"hidden"
          }} >
          <canvas ref={canvasref} width={window.innerWidth} height={window.innerHeight}  ></canvas>
          
            <Topbar selectedtool={selectedtool} setselectedtool={setselectedtool}></Topbar>
      </div>
}

function Topbar({selectedtool,setselectedtool}:{
  selectedtool:shape,
  setselectedtool:(s:shape)=>void
}){
return <div style={{
    position:"absolute",
    top:10,
    left:600
  }}>
    <div className="bg-gray-600 rounded-lg p-1 flex gap-2">
<Iconbutton activated={selectedtool == "line"} icon={<PenLineIcon></PenLineIcon>} onClick={()=>{setselectedtool("line")}}></Iconbutton>
<Iconbutton activated={selectedtool == "text"} icon={<Text/>} onClick={()=>{setselectedtool("text")}}></Iconbutton>
<Iconbutton activated={selectedtool == "rect"} icon={<RectangleHorizontalIcon></RectangleHorizontalIcon>} onClick={()=>{setselectedtool("rect")}}></Iconbutton>
<Iconbutton activated={selectedtool == "circle"} icon={<Circle></Circle>} onClick={()=>{setselectedtool("circle")}}></Iconbutton>
<Iconbutton activated={selectedtool == "triangle"} icon={<Triangle></Triangle>} onClick={()=>{setselectedtool("triangle")}}></Iconbutton>
</div>
  </div>

}