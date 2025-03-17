"use client"

export function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (<div className="border-2 text-gray-900  rounded-lg   " >
    
     
        <div className="flex items-center shadow justify-center text-indigo-600 bg-indigo-50 rounded-t-lg p-4">
           <Icon/>
          </div>
      <div className="text-3xl  text-center font-bold text-gray-900 mb-4 ">
      {title}

      </div>
      <div className="text-center text-lg text-gray-500 max-w-2xl mx-auto p-4">
      {description}

      </div>
    </div>
  
  );
}
