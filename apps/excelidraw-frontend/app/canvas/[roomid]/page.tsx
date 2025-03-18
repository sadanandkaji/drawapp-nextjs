import {RoomCanvas} from "@/component/roomcanvas"

export default async function canvaspage({params}:{params:{roomid:string}}){

    const roomid=(await params).roomid
  
     return <RoomCanvas roomid={roomid}></RoomCanvas>

   
}