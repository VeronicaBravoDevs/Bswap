"use client";

import { useEffect, useState } from "react";
import { bootServices } from "../services/books/booksService";
import { Book } from "@/app/interface/book";

export function useBooks(quantity?: number): {
  data: Book[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const result = await bootServices.getBooks(quantity);
      setBooks(result);
      setError(null);
    } catch (error) {
      console.error("Error al obtener libros:", error);
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [quantity]);

  return { data: books, loading, error, refetch: fetchBooks };
}