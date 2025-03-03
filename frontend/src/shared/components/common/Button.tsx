import React, {ReactNode} from "react";


interface Props {
  children:ReactNode; 
  onClick:()=>void;
  className?:string;
  variant?: 'primary' | 'secondary' | 'email' | 'follow' | 'login';
}

export const Button =(
  {children, onClick, className= '', variant = 'primary'} : Props ) => {

    const baseButton = "bg-blue-500 text-white p-2 rounded hover:bg-slate-50 "

    const variantButton = {
      primary: "bg-blue-600 text-white",
      secondary: "w-full bg-gray-400 text-black border-0 hover:border hover:border-gray-400 hover:text-zinc-400 rounded transition-colors",
      email: "bg-blue-800 text-white border-0 hover:text-black hover:border hover:border-gray-400",
      follow: "bg-blue-400 text-white",
      login: "bg-slate-400 text-black"
    };
  return ( 
      <button 
        onClick={onClick} 
        className={`${baseButton} ${variantButton[variant]} ${className}`}>
      {children}
      </button>   
  );
}
