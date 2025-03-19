import { HTTP_BACKEND_URL } from "@/config";
import axios from "axios";

export async function getexistingshapes(roomid:string){
    const response=await axios.get(`${HTTP_BACKEND_URL}/chats/${roomid}`)
    const messages=response.data.messages
  
   const shapes= messages.map((x:{message:string})=>{
      const messagedata=JSON.parse(x.message);
      return  messagedata.shape
    })
  return shapes
  
  
  }