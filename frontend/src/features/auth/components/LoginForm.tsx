"use client"

import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/shared/components/common/Button";
import Link from "next/link";




export default function LoginForm() {

const handleEmailLogin = () => {console.log("Inicio sesion con email")};

const handleGoogleLogin = () => {console.log("Inicio sesion con Google")};

const handleFacebookLogin = () => {console.log("Inicio sesion con Facebook")};


  return(
  <>
  <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto border-2 border-gray-500 p-8 my-16">
    <div className="w-full mb-4">
      <h1 className="font-bold text-center mb-2 text-3xl">Iniciar sesion en Bswap</h1>
      <h2 className="text-center leading-7 text-2xl ">
        Comparte libros, <br/> descubre nuevas historias 
      </h2>
    </div>

    <div className="w-full mb-6">
      <Button variant="email"
      onClick={handleEmailLogin} 
      className="w-full p-6">
        Continuar con correo electronico
      </Button>
    </div>

    <p className="text-center w-full mb-4"> - o - </p>

    <div className="w-full mb-16 ">
      <Button variant="secondary"
      onClick={handleGoogleLogin}  
      className="w-full text-center p-4 mb-6 flex items-center justify-center gap-4 border border-gray-400 text-slate-300">        
        <span> <FcGoogle/>  </span>Continuar con google
      </Button>
      <Button variant="secondary" 
      onClick={handleFacebookLogin} 
      className="w-full  text-center p-4 flex items-center justify-center gap-4 border border-gray-400">    
        <span className=" text-blue-800"> <FaFacebook/> </span> Continuar con Facebook
      </Button>
    </div>
    <div>
      <p>
        No tenes cuenta en Bswap? <Link href="/register" className="text-blue-600 hover:underline font-semibold">Registrate</Link>
      </p>
    </div>

    <div>
      <p>
        Al continuar acepta nuestros <Link href="/term" className="text-blue-400 hover:underline">Terminos de servicio</Link> y 
        <Link href="/privacy" className="text-blue-400 hover:underline "> Politica de privacidad</Link>
       
      </p>
    </div>
  </div>
  </>);
}

 {/* terms/page.tsx y privacy/page.tsx no estan creados deberian estar en carpeta pages */}