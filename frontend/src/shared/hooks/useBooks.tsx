"use client";

import { useEffect, useState } from "react";
import { getBooks } from "../services/api/books/getBooks";
import { Book } from "@/app/interface/book";

export function useBooks() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const result = await getBooks();
        setBooks(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  return { data: books, loading, error };
}
