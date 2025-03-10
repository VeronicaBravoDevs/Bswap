import Link from "next/link";

export default function MyLibrary() {
  return (
    <>
      <h2 className="text-center  text-4xl font-bold">Mi Biblioteca</h2>

      <div className="bg-white p-4 rounded-md">
        <p className="text-bold text-xl font-bold">Estas en tu cuenta de Bswap</p>
        <h3>Crear Libros</h3>
        <p>¿Necesitas cambiar tu cuenta?</p>{" "}
        <Link href={"/logout"}>Cerrar Sesión</Link>
        <nav className="flex-wrap">
          <ul className="flex flex-wrap gap-4">
            <li className="underline">Datos Personales</li>
            <li className="underline">Mi biblioteca</li>
            <li className="underline">Mis seguidores</li>
          </ul>

          <div>
            <p>Mis Libros</p>
          </div>
          <div>
            <p>Libros Intercambiados</p>
          </div>
          <div>
            <p>Libros Que deseo</p>
          </div>
          <div>
            <Link href="/books/createbook">Cargar Libro</Link>
          </div>
        </nav>
      </div>

      <Link href="/books/createbook">Subir Libro</Link>
    </>
  );
}
