import { useState, useEffect } from 'react';
import { Review } from '@/app/interface/book';
import { reviewService } from '@/shared/services/books/reviewService';
import { bootServices } from '../services/books/booksService';
import mockData from '../../../public/mock/mockDataReviews.json';

interface UseReviewsReturn {
  data: any[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useReviews = (bookId?: string): UseReviewsReturn => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      let reviewsData: Review[] = [];

      if (bookId) {
        // Si tenemos ID de libro, buscamos las reseñas de ese libro
        reviewsData = await reviewService.getReviewsByBookId(bookId);
        
        // Si el libro existe, obtenemos sus detalles
        const bookDetails = await bootServices.getBookById(bookId);
        
        if (bookDetails && reviewsData.length > 0) {
          // Enriquecemos las reseñas con información del libro
          const enhancedReviews = reviewsData.map(review => ({
            ...review,
            bookTitle: bookDetails.title,
            bookAuthor: bookDetails.author
          }));
          
          setData(enhancedReviews);
        } else {
          setData([]);
        }
      } else {
        // Si no hay ID, traemos todas las reseñas
        reviewsData = await reviewService.getReviews();
        
        if (reviewsData.length > 0) {
          // Para cada reseña, necesitamos obtener los detalles del libro
          const enhancedReviews = await Promise.all(
            reviewsData.map(async (review) => {
              const bookDetails = await bootServices.getBookById(review.bookId);
              return {
                ...review,
                bookTitle: bookDetails?.title || "Título desconocido",
                bookAuthor: bookDetails?.author || "Autor desconocido"
              };
            })
          );
          
          setData(enhancedReviews);
        } else {
          // Si no hay reseñas reales, usamos los datos de ejemplo
          const mockReviews = mockData.books.flatMap(book =>
            book.reviews.map(review => ({
              ...review,
              bookId: book.id,
              bookTitle: book.title,
              bookAuthor: book.author,
              content: review.comment,
            }))
          );
          setData(mockReviews);
        }
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError(err instanceof Error ? err : new Error('Error desconocido al obtener reseñas'));
      
      // Fallback a datos mock en caso de error
      const mockReviews = mockData.books.flatMap(book =>
        book.reviews.map(review => ({
          ...review,
          bookId: book.id,
          bookTitle: book.title,
          bookAuthor: book.author,
          content: review.comment,
        }))
      );
      setData(mockReviews);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  return { data, loading, error, refetch: fetchReviews };
};

export default useReviews;
