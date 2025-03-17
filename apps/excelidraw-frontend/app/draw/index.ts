

export function initdraw(canvas:HTMLCanvasElement){
   
    const ctx=canvas.getContext("2d");
    if(!ctx){
        return;
    }
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
    console.log(e.clientX);
    console.log(e.clientY)
   }) 
   canvas.addEventListener("mousemove",(e)=>{
    if(clicked){
        const width= e.clientX-startx
        const height= e.clientY-starty;
        ctx.clearRect(0,0,canvas.width,canvas.height)
       ctx.fillStyle="rgba(0,0,0)"
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.strokeStyle="rgba(255,255,255)"
        ctx.strokeRect(startx,starty,width,height)
    }
   }) 
}