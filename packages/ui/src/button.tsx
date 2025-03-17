"use client";

import { ReactNode } from "react";

interface ButtonProps {
  variant: "primary" | "outline";
  onClick:()=>void;
  name:string;

}

const variantprops={
  primary:"bg-indigo-600 text-white",
  outline:"bg-white text-indigo-600 border border-blue-600"

}


export const Button = ({ variant , onClick , name}: ButtonProps) => {
  return (
    <button
     className={`px-6 py-2 rounded-lg  ${variantprops[variant]} cursor-auto`}
     onClick={onClick}
    >
      {name}
    </button>
  );
};
