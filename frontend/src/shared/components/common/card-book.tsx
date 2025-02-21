import { Book } from "@/app/interface/book";
import Image from "next/image";
import Link from "next/link";

interface CardBookProps {
  book: Book;
}

export default function CardBook({ book }: CardBookProps) {
  return (
    <Link href={`/books/${book.id}`}>
      <div className="bg-bwhite border-2 border-gray-400 p-8">
        <Image src="/imagenprueba.png" alt="Imagen De prueba" width={300} height={500} />
        {book.author && <p>{book.author}</p>}
        {book.title && <p>{book.title}</p>}
      </div>
    </Link>
  );
}
