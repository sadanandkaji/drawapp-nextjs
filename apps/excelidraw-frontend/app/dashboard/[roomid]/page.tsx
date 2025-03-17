"use client"

import { initdraw } from "@/app/draw"
import { useEffect, useRef } from "react"

export default function canvas(){
  const canvasref=useRef<HTMLCanvasElement>(null)

  useEffect(()=>{
    if(canvasref.current){
       initdraw(canvasref.current) 
    }
  },[canvasref])

    return <div >
        <canvas ref={canvasref} width={1500} height={1500}  ></canvas>
    </div>

}