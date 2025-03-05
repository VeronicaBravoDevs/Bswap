"use client";

import { useEffect, useState } from "react";
import { getReviews } from "@/shared/services/books/getReviews";
import { Review } from "@/app/interface/book";

export function useReviews(bookId: string) {
  const [ reviews, setReviews ] = useState<Review[] | null>(null);
  const [ error, setError ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const result = await getReviews(bookId);
        setReviews(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally { setLoading(false) }
    };

    loadReviews();
  }, [ bookId ]);

  return { data: reviews, loading, error };
}
