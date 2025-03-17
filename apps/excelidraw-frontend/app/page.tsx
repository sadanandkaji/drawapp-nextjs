"use client"

import React from 'react';
import { Pencil, Share2, Users, Shapes, Download } from 'lucide-react';
import {Button} from "@repo/ui/button";
import {FeatureCard} from "@repo/ui/card";
import { useRouter } from 'next/navigation';


function App() {
  const router=useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
            
              <span className="ml-2 text-xl font-bold text-gray-900">DRAWapp</span>
            </div>
            <div className="flex items-center space-x-4">

              <Button name="open drawapp" variant='primary' onClick={()=>{
               
              }}></Button>
              <Button name="signin" variant='primary' onClick={()=>{
                router.push("/signin")
              }}></Button>

            

            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Whiteboarding, reimagined for the digital age
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Create beautiful hand-drawn diagrams, wireframes, and illustrations with our intuitive drawing tool. Perfect for teams, designers, and anyone who loves to sketch out ideas.
            </p>
            <div className="flex justify-center space-x-4">


            <Button name="start drawing" variant='primary' onClick={()=>{
              router.push("/dashboard/[roomid]")
            }}></Button>



            <Button name="watch demo" variant='outline' onClick={()=>{}}></Button>


            </div>
          </div>

          {/* Preview Image */}
          <div className="mt-16 rounded-xl overflow-hidden shadow-2xl border border-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80" 
              alt="Excelidraw Interface Preview"
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>

   {/* Features Section */}
   <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to bring ideas to life</h2>
            <p className="text-xl text-gray-600">Powerful features that make drawing and collaboration seamless</p>
          </div>
          <div className='flex gap-4' >
            <FeatureCard 
              icon={Pencil}
              title="Intuitive Drawing"
              description="Natural hand-drawn feel with smart shape recognition and customizable styles"
            />
            <FeatureCard 
              icon={Share2}
              title="Easy Sharing"
              description="Share your drawings instantly with a link or export in multiple formats"
            />
            <FeatureCard 
              icon={Users}
              title="Real-time Collaboration"
              description="Work together with your team in real-time, see changes as they happen"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-2xl py-16 px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to start creating?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of teams and individuals who use Excelidraw to bring their ideas to life.
            </p>


            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors text-lg font-medium">
              Get Started for Free
            </button>


          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
             
              <span className="ml-2 text-lg font-semibold text-gray-900">Excelidraw</span>
            </div>
            <div className="text-gray-500 text-sm">
              © 2024 Excelidraw. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
