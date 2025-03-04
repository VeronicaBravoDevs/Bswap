"use client"

import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/shared/components/common/Button";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, LoginCredentials } from "../types/auth.types";
import {useAuth} from "@/shared/hooks/useAuth";




export default function LoginForm() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading, error, clearError } = useAuth();
  const [showEmailForm, setShowEmailForm] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    setValue,
    formState: { errors } 
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  // Comprobar si hay credenciales guardadas en localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
    }
  }, [setValue]);

  const handleEmailLogin = () => {
    setShowEmailForm(true);
  };

  const handleGoogleLogin = () => {
    console.log("Inicio sesion con Google");
    // Implementación real de login con Google
  };

  const handleFacebookLogin = () => {
    console.log("Inicio sesion con Facebook");
    // Implementación real de login con Facebook
  };

  const onSubmit = async (data: LoginCredentials) => {
    try {
      clearError();
      await login(data);
      
      // Guardar el email en localStorage para autocompletar en futuras visitas
      localStorage.setItem("userEmail", data.email);
      
      // La redirección se maneja en el useEffect
    } catch (e) {
      console.error("Error en el formulario de login:", e);
    }
  };

  if (showEmailForm) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto border-2 border-gray-500 p-8 my-16">
        <div className="w-full mb-4">
          <h1 className="font-bold text-center mb-2 text-3xl">Iniciar sesión</h1>
          <h2 className="text-center leading-7 text-2xl">
            Ingresa tus credenciales
          </h2>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Correo electrónico
            </label>
            <input
              id="email"
              {...register("email")}
              className="w-full p-2 border border-gray-300 rounded"
              type="email"
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2">
              Contraseña
            </label>
            <input
              id="password"
              {...register("password")}
              className="w-full p-2 border border-gray-300 rounded"
              type="password"
              placeholder="Tu contraseña"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <Button 
            type="submit" 
            variant="email" 
            className="w-full p-2 mb-4"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Ingresar"}
          </Button>
          
          <Button            
            variant="secondary" 
            className="w-full p-2"
            onClick={() => setShowEmailForm(false)}
          >
            Volver
          </Button>
        </form>
      </div>
    );
  }






  return(
 
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
      className="w-full p-2">
        Continuar con correo electronico
      </Button>
    </div>

    <p className="text-center w-full mb-4"> - o - </p>

    <div className="w-full mb-16 ">
      <Button variant="secondary"
      onClick={handleGoogleLogin}  
      className="w-full text-center p-2 mb-6 flex items-center justify-center gap-4 border border-gray-400 text-slate-300">        
        <span> <FcGoogle/>  </span>Continuar con google
      </Button>
      <Button variant="secondary" 
      onClick={handleFacebookLogin} 
      className="w-full  text-center p-2 flex items-center justify-center gap-4 border border-gray-400">    
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
  );
}

 {/* terms/page.tsx y privacy/page.tsx no estan creados deberian estar en carpeta pages */}