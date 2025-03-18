"use client"

import { WS_URL } from "@/config"
import { initdraw } from "@/draw"
import { useEffect, useRef, useState } from "react"
import {Canvas} from "./canvas"


export function RoomCanvas({roomid}:{roomid:string}){
   

    const [socket,setsoket]=useState<WebSocket | null>(null)

    useEffect(()=>{
      const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2MmNiODg1YS1iY2JkLTRlYTQtOTA4OC04MDY0ZDMxOWZjNDciLCJpYXQiOjE3NDIwNzE4OTJ9.vxClgr1Vi7vl6lyd3mXjlV_cJa9EfnyFk3Puo1gn7Dw`);
      ws.onopen=()=>{
        setsoket(ws)
        const data=JSON.stringify({
          type:"join-room",
          roomid
        })
        console.log(data)
        ws.send(data)
      }
    },[])

    
     

      if(!socket){
        return<div>
          connecting to server ......
        </div>
      }
    return <Canvas roomid={roomid} socket={socket} ></Canvas>

}