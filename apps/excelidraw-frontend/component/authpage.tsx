"use client"
export default function Authpage({issignin}:{issignin:boolean}){    
    return <div className="h-screen w-screen flex justify-center items-center">

        <div className="bg-gray-800 h-80 w-90 rounded-xl">

            
            <div className="text-gray-200 text-3xl text-center p-4 border-b border-white">               
            {issignin ? <div>Signin</div> : <div>Signup</div>}
            </div>
            <div className=" pt-4 " >

           <div className="text-center p-3 "><input className="px-3 py-1 border-2 border-white rounded" type="text" placeholder="email"></input></div> 
           <div className="text-center p-3 "><input className="px-3 py-1 border-2 border-white rounded" type="text" placeholder="password"></input></div> 
           
            </div>
            <div className="text-center pt-4 ">
            <button className="px-6 py-2 bg-blue-500 rounded  "
            
             
            > {issignin ? <div>Signin</div> : <div>Signup</div>}</button>
            </div>

        </div>

    </div>
}