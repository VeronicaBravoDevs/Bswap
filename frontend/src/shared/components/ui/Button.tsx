import React, {ReactNode} from "react";


interface Props {
  children:ReactNode; 
  onClick:()=>void;
  className?:string;  
}

export const Button =(
  {children, onClick, className= ''} : Props ) => {
  return ( 
      <button onClick={onClick} className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-slate-50 ${className}`}>
      {children}
      </button>
   
  );
}
