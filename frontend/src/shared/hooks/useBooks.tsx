"use client";

import { useEffect, useState } from "react";
import { bootServices } from "../services/books/booksService";
import { Book } from "@/app/interface/book";

export function useBooks(): { data: Book[], loading: boolean, error: string | null } {
  const {getBooks} = bootServices;
  const [ books, setBooks ] = useState<Book[]>([]);
  const [ error, setError ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    const loadBooks = () => {
   
      getBooks().then((result) => {
        // const filteredBooks = result.filter( (book: Book)=> book.exchange_available );
        setBooks(result);
      }
      ).catch((error) => {
        setError(error instanceof Error ? error.message : "Unknown error");
      }
      ).finally(() => {
        setLoading(false);
      }
      );
    };

    loadBooks();
  }, []);

  return { data: books, loading, error };
}
