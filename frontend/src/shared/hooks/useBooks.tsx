"use client";

import { useEffect, useState } from "react";
import { bootServices } from "../services/books/booksService";
import { Book } from "@/app/interface/book";

export function useBooks(quantity?: number): {
  data: Book[];
  loading: boolean;
  error: string | null;
} {
  const { getBooks } = bootServices;
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const result = await getBooks();

        // Si quantity está definido, limitamos la cantidad de libros
        const filteredBooks = quantity ? result.slice(0, quantity) : result;

        setBooks(filteredBooks);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [getBooks, quantity]); // Dependemos de quantity también para recargar si cambia

  return { data: books, loading, error };
}
