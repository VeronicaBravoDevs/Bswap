
import { notFound } from "next/navigation";
import {BookImageModal} from "@/shared/components/ui/BookImageModal";
import { bootServices } from "@/shared/services/books/booksService";
import { Book } from "@/app/interface/book";
import Image from "next/image";
import { userServices } from "@/shared/services/users/usersService";
import { User } from "@/app/interface/user";

/* 
//usar directamente de bookService bootService
async function getBookById(id: string) {
  const res = await fetch("https://equipo-s21-05-m-webapp.onrender.com/books");

  if (!res.ok) {
    throw new Error("Error fetching books");
  }

  const response = await res.json();
  const books = response.data || [];

  return books.find((book: Book) => book.id === id);
} */

export default async function BookPage({ params }: { params: { id: string } }) {
  const { id } = params;
//agrego bootService para getBookById

try {
  const book = await bootServices.getBookById(id) as Book;

  if (!book) return notFound();  

  const user = await userServices.getUsersById(book.userId) as User;

  //imagenes extra??
  const extraImages = [
    book.image || "/imagenprueba.png", "/imagenprueba.png", "/imagenprueba.png" ].filter(Boolean).slice(0,3) as string [];

  return (
    <div className="container mx-auto p-6">
      {/* ficha tecnica + datos de contacto - datos usuario */}
   
      <div className="flex flex-col md:flex-row gap-8 mb-12">
   
        <div className="w-full md:w-1/3">
          <div className="relative h-[500px] w-full">
            <Image
              src={book.cover ? book.cover : "/imagenprueba.png"}
              alt={`Portada del libro ${book.title}`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
   
        <div className="w-full md:w-2/3">
      
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">FICHA TECNICA</h1>            
            <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2">
              <h2 className="font-semibold">Título:</h2>
              <p>{book.title}</p>
              
              <h2 className="font-semibold">Autor:</h2>
              <p>{book.author}</p>
              
              <h2 className="font-semibold">Género:</h2>
              <p>{book.genre || "No especificado"}</p>
              
              <h2 className="font-semibold">Editorial:</h2>
              <p>{book.publisher || "No especificado"}</p>
              
              <h2 className="font-semibold">Sinopsis:</h2>
              <p>{book.description || "No disponible"}</p>
              
              <h2 className="font-semibold">Estado del libro:</h2>
              <p>{book.status || "No especificado"}</p>
            </div>            
         
            <BookImageModal images={extraImages} />
          </div>
                  
          <div>
            <h2 className="text-2xl font-bold mb-4">Datos de contacto</h2>
            <h3 className="font-semibold">Subido por {user?.name || "Usuario desconocido"}</h3>
            <h3 className="font-semibold mt-2">Ubicación: 
              <span className="font-normal">
              {user?.city || "No especificada"} - {user?.country || "Argentina - Colombia - Uruguay"}
              
              </span></h3>
            
            <button className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-zinc-50 hover:text-black">
              Solicitar intercambio
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src="https://res.cloudinary.com/duyahznm2/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1740713650/bswap/face-indian-woman_priyinka_gtbhbs.jpg"
              alt="Foto de perfil"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-xl font-bold">{user?.name || 'Usuario fantasma'}</h2>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="font-semibold">Libros publicados = 5</h3>
            {/* resolver como obtener cantidad de libros */}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="font-semibold">Libros que {user?.name || "el usuario"} desea conseguir</h3>
          </div>
          
          <ol className="list-decimal pl-8 mt-2">
            <li>El señor de los anillos</li>
            <li>Cien años de soledad</li>
            <li>1984</li>
          </ol>
        </div>
      </div>      
    </div>
  );
} catch(error) {
  console.error("Error al cargar el libro:", error);
  return notFound()
}
}
