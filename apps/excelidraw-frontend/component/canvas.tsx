import { useEffect, useRef, useState } from "react"
import { Iconbutton } from "./iconbutton";
import { Circle,PenLineIcon, RectangleHorizontalIcon, Text, Triangle } from "lucide-react";
import { Game } from "@/draw/game";


export type Tool=  "circle" | "rect" | "line" | "triangle" |"text"
export function Canvas({roomid,socket}:{roomid:string ,socket:WebSocket}){

     const canvasref=useRef<HTMLCanvasElement>(null)
     const [selectedtool,setselectedtool]=useState<Tool>("line")
     const [game,setgame]=useState<Game>()

     useEffect(()=>{
      game?.setTool(selectedtool)
     },[selectedtool,game])
     useEffect(() => {
        if (canvasref.current) {
          const g=new Game(canvasref.current,roomid,socket)
          setgame(g)
          return ()=>{
            g.destroy()
          }
        }
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
  selectedtool:Tool,
  setselectedtool:(s:Tool)=>void
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