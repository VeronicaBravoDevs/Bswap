import React, {ReactNode} from "react";


interface Props {
  children:ReactNode; 
  onClick:()=>void;
  className?:string;
  variant?: 'primary' | 'secondary' | 'email' | 'follow' | 'login';
}

export const Button =(
  {children, onClick, className= '', variant = 'primary'} : Props ) => {

    const baseButton = "bg-blue-500 text-white px-4 py-2 rounded hover:bg-slate-50 "

    const variantButton = {
      primary: "bg-blue-600 text-white",
      secondary: "w-1/2 bg-slate-300 hover:bg-sky-700 text-blue-950 hover:text-zinc-400 py-2 px-4 rounded transition-colors",
      email: "bg-blue-800 text-white",
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
