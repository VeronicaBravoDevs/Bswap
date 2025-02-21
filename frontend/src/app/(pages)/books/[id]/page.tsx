import { Book } from "@/app/interface/book";
import { notFound } from "next/navigation";

async function getBookById(id: string) {
  const res = await fetch("https://equipo-s21-05-m-webapp.onrender.com/books", {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Error fetching books");
  }

  const response = await res.json();
  const books = response.data || [];

  return books.find((book: Book) => book.id === id);
}

export default async function BookPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const book = await getBookById(id);

  if (!book) return notFound();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-lg">{book.author}</p>
      <p>{book.description}</p>
    </div>
  );
}
