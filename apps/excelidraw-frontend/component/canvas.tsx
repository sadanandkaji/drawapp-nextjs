
import { initdraw } from "@/draw"
import { useEffect, useRef } from "react"

export function Canvas({roomid,socket}:{roomid:string ,socket:WebSocket}){
     const canvasref=useRef<HTMLCanvasElement>(null)
     useEffect(() => {
      const interval = setInterval(() => {
        if (canvasref.current) {
          initdraw(canvasref.current, roomid, socket);
          clearInterval(interval);
        }
      }, 100); // Check every 100ms until canvas is available
    
      return () => clearInterval(interval);
    }, [canvasref]);
          return <div >
          <canvas ref={canvasref} width={1500} height={1500}  ></canvas>
      </div>
}