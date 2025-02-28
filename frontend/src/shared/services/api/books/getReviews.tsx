import { Book } from "@/app/interface/book";

export const getReviews = async (bookId: string) => {
   try {
     const res = await fetch("/mock/mockData.json");
     if (!res.ok) throw new Error("Error al obtener los datos");
 
     const mockData: Book[] = await res.json(); // carga el JSON  
     const book = mockData.find((b) => b.id === bookId);
     
     if (!book) throw new Error("No se encontro el libro");
     return book.reviews || [];
   } catch (error) {
     console.error("No pudimos obtener recomendaciones:", error);
     return [];
   }
 };