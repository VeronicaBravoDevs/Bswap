import { Button } from "@/shared/components/ui/Button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bswap - Logearse",
  description:
    "Logeate a Bswap y comienza a intercambiar tus libros en tu ciudad.",
};

export default function Login() {
  return;
  <>
  <div className="border-2 border-gray-500 p-8">
    <div>
      <h1 className="font-bold text-center">Iniciar sesion en Bswap</h1>
      <h2 className="text-center leading-7">
        Comparte libros, <br /> descubre nuevas historias{" "}
      </h2>
    </div>
    <div>
      <Button className="bg-blue-700 text-white p-6">continuar con correo electronico</Button>
    </div>

    <p> - o - </p>
    <div>
      <Button className="font-bold text-center p-9">        
        <span>🟢</span>Continuar con google
      </Button>
      <Button className="font-bold text-center p-9">    
        <span>🟢</span> Continuar con Facebook
      </Button>
    </div>
    <div>
      <p>
        No tenes cuenta en Bswap <Link>Registrate</Link>
      </p>
    </div>

    <div>
      <p>
        Al continuar acepta nuestros <Link>Terminos de servicio</Link> y{" "}
        <Link>Politica de privacidad</Link>
      </p>
    </div>
    </div>
  </>;
}
