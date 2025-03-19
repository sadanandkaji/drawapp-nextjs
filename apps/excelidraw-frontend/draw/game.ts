import { Tool} from "@/component/canvas";
import { getexistingshapes } from "./https";


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

export class Game{
      private canvas:HTMLCanvasElement;
      private ctx:CanvasRenderingContext2D;
      private existingshapes:Shape[];
      private roomid:string;
      socket:WebSocket;
      private clicked:boolean;
      private startx:number;
      private starty:number;
      private selectedtool:Tool="circle"
      


    constructor(canvas:HTMLCanvasElement,roomid:string,socket:WebSocket){
        this.canvas=canvas;
        this.ctx=canvas.getContext("2d")!;
        this.existingshapes=[];
        this.socket=socket
        this.roomid=roomid
        this.clicked=false
        this.startx=0;
        this.starty=0
        this.init();
        this.initHandeleres();
        this.initeventhandelers();
       
    }
    
    destroy(){
        this.canvas.removeEventListener("mousedown",this.Mousedownhandler) 
        this.canvas.removeEventListener("mouseup",this.Mouseuphandler) 
        this.canvas.removeEventListener("mousemove",this.Mousemovehandler) 
    }
    setTool(Tool:Tool){
           this.selectedtool=Tool
    }

    async init(){
        this.existingshapes=await getexistingshapes(this.roomid);
        this.clearcanvas()
    }

    initHandeleres(){
         this.socket.onmessage=(event)=>{
            const message=JSON.parse(event.data)
            if(message.type == "chat"){
                const parsedata=JSON.parse(message.message);
                this.existingshapes.push(parsedata.shape)
               this.clearcanvas()
    
            }
        }
    }

     clearcanvas(){
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
            this.ctx.fillStyle="rgba(0,0,0)"
             this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
             this.existingshapes.map((shapes)=>{
                 if(shapes.type === "rect"){
                    this.ctx.strokeStyle="rgba(255,255,255)"
                    this.ctx.strokeRect(shapes.x,shapes.y,shapes.width,shapes.height)
                    }else if(shapes.type === "circle"){                 
                    this.ctx.beginPath();
                    this.ctx.arc(shapes.centerX, shapes.centerY, shapes.radius, 0, Math.PI * 2);
                    this.ctx.stroke();
                    this.ctx.closePath();
                    }else if(shapes.type == "line"){    
                    this.ctx.beginPath();
                    this.ctx.moveTo(shapes.x1,shapes.y1);
                    this.ctx.lineTo(shapes.x2,shapes.y2)
                    this.ctx.stroke()
                    }else if(shapes.type == "triangle"){
                        this.ctx.beginPath();
                        this.ctx.moveTo(shapes.x1,shapes.y1); 
                        this.ctx.lineTo(shapes.x2,shapes.y2); 
                        this.ctx.lineTo(shapes.x3,shapes. y3); 
                        this.ctx.closePath(); 
                        this.ctx.stroke();      
                    }
             })
        
        }

        Mousedownhandler=(e:MouseEvent)=>{
            this.clicked=true
            this.startx=e.clientX;
            this.starty=e.clientY
        }
        Mouseuphandler=(e:MouseEvent)=>{
            this.clicked=false
            const width=e.clientX-this.startx;
            const height=e.clientY-this.starty;
           let shape:Shape | null=null
        
            const tool=this.selectedtool
            if(tool == "rect"){
                 shape={
                    type:"rect",
                    x:this.startx,
                    y:this.starty,
                    width:width,
                    height:height
            }
         
            }else if(tool == "circle"){
                 shape={
                 type:"circle",
                 centerX:this.startx + width / 2,
                 centerY:this.starty + height / 2,
                 radius:Math.hypot(width, height) / 2
                }
            }else if(tool == "line"){
                shape={
                type:"line",
                x1:this.startx,
                y1:this.starty,
                x2:e.clientX,
                y2:e.clientY
               }
            }else if(tool == "triangle"){
                 shape={
                    type:"triangle",
                    x1:this.startx,
                    y1:this.starty,
                    x2:this.startx+width/2,
                    y2:this.starty+height,
                    x3:this.startx-width/2,
                    y3:this.starty+height
                }
            }
            if(!shape){
                return
            }
           
            this.socket.send(JSON.stringify({
                type:"chat",
                roomid:this.roomid,
                message:JSON.stringify({
                    shape
                })
        
            }
            ))
        }
        Mousemovehandler=(e:MouseEvent)=>{
            if(this.clicked){
                const width= e.clientX-this.startx
                const height= e.clientY-this.starty;
                this.clearcanvas()
                this.ctx.strokeStyle="rgba(255,255,255)"
                const tool=this.selectedtool
                if(tool== "rect"){
                    this.ctx.strokeRect(this.startx,this.starty,width,height)
                }else if(tool== "circle"){
                   
                const centerx = this.startx + width / 2;
                const centery =this.starty + height / 2;
                const radius = Math.hypot(width, height) / 2; 
                
                this.ctx.beginPath();
                this.ctx.arc(centerx, centery, radius, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
        
                }else if(tool == "line"){
                    
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.startx,this.starty);
                    this.ctx.lineTo(e.clientX,e.clientY)
                    this.ctx.stroke()
                 
                }else if(tool == "triangle"){
                    const x1 =this. startx, y1 = this.starty; // First point (top vertex)
                    const x2 = this.startx + width / 2, y2 = this.starty + height; // Bottom-right vertex
                    const x3 = this.startx - width / 2, y3 = this.starty + height; // Bottom-left vertex
                
                    this.ctx.beginPath();
                   this. ctx.moveTo(x1, y1); // Move to the first point
                    this.ctx.lineTo(x2, y2); // Line to second point
                    this.ctx.lineTo(x3, y3); // Line to third point
                    this.ctx.closePath(); // Close path to form triangle
                    this.ctx.stroke();         
                }
            }
        }
    initeventhandelers(){
        this.canvas.addEventListener("mousedown",this.Mousedownhandler) 
        this.canvas.addEventListener("mouseup",this.Mouseuphandler) 
        this.canvas.addEventListener("mousemove",this.Mousemovehandler) 
    }

        
    }
