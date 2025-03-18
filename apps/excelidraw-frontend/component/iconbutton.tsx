


import { ReactNode } from "react"

export function Iconbutton({icon ,onClick,activated}:{
    icon:ReactNode,
    onClick:()=>void,
    activated:boolean
}){
    return <div className={ `rounded-xl bg-gray-800 p-2  hover:bg-gray-700 cursor-pointer
     ${activated ? "text-red-400" : "text-white" }`}  onClick={onClick}>
    {icon}
    </div>
}