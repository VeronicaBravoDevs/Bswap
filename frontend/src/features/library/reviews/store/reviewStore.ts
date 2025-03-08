import { create } from 'zustand';
import { Review } from '@/app/interface/book';
import { Book } from '@/app/interface/book';
import { reviewService } from '@/shared/services/books/reviewService';
import { bootServices } from '@/shared/services/books/booksService';
import { userServices } from '@/shared/services/users/usersService';

 
interface ReviewState {
  reviews: any[];
  books: Book[];
  users: any[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  
  // Acciones
  fetchReviews: () => Promise<void>;
  fetchBooks: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  addReview: (review: Omit<Review, 'id'>) => Promise<boolean>;
  setSearchTerm: (term: string) => void;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: [],
  books: [],
  users: [],
  loading: false,
  error: null,
  searchTerm: '',
  
  
  fetchReviews: async () => {
    set({ loading: true });
    try {
    
      const reviewsData = await reviewService.getReviews();
      
      // Si hay datos, usarlos sino cargar mock 
      if (reviewsData.length > 0) {
         
        set({ reviews: reviewsData, loading: false });
      } else {
        
        try {
          const mockResponse = await fetch('/mock/mockDataReviews.json');
          const mockData = await mockResponse.json();
          
           
          const mockReviews = mockData.books.flatMap(book =>
            book.reviews.map((review: any) => ({
              ...review,
              bookId: book.id,
              bookTitle: book.title,
              bookAuthor: book.author,
              content: review.comment,
            }))
          );
          
          set({ reviews: mockReviews, loading: false });
        } catch (mockError) {
          console.error("Error al cargar datos mock:", mockError);
          set({ loading: false, error: "Error al cargar las reseñas" });
        }
      }
    } catch (error) {
      console.error("Error al obtener reseñas:", error);
      set({ loading: false, error: "Error al cargar las reseñas" });
      
      //  mock como fallback
      try {
        const mockResponse = await fetch('/mock/mockDataReviews.json');
        const mockData = await mockResponse.json();
        
        const mockReviews = mockData.books.flatMap(book =>
          book.reviews.map((review: any) => ({
            ...review,
            bookId: book.id,
            bookTitle: book.title,
            bookAuthor: book.author,
            content: review.comment,
          }))
        );
        
        set({ reviews: mockReviews });
      } catch (mockError) {
        console.error("Error al cargar datos mock:", mockError);
      }
    }
  },
  
  // Carga libros desde la API
  fetchBooks: async () => {
    try {
      const booksData = await bootServices.getBooks();
      set({ books: booksData });
    } catch (error) {
      console.error("Error al obtener libros:", error);
      set({ error: "Error al cargar los libros" });
    }
  },
  
  // Carga usuarios desde la API
  fetchUsers: async () => {
    try {
      const usersData = await userServices.getUsers();
      set({ users: usersData });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      set({ error: "Error al cargar los usuarios" });
    }
  },
  
  // nueva resña
  addReview: async (reviewData: Omit<Review, 'id'>) => {
    try {
      const result = await reviewService.createReview(reviewData);
      
      if (result) {
        // Obtener información adicional del libro y usuario, es necesario?
        const { books, users, reviews } = get();
        const book = books.find(b => b.id === reviewData.bookId);
        const user = users.find(u => u.id === reviewData.userId);
        
        // Crea objeto completo para la UI
        const newReviewForUI = {
          ...result,
          bookTitle: book?.title || "Título desconocido",
          bookAuthor: book?.author || "Autor desconocido",
          user: user || {
            id: reviewData.userId,
            name: "Usuario actual",
            profile_picture: "https://res.cloudinary.com/duyahznm2/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1741045251/bswap/avatar-perfil_fupyvn.jpg"
          }
        };
        
        // Actualiza el estado con nueva reseña
        set({ reviews: [newReviewForUI, ...reviews] });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error al crear la reseña:", error);
      set({ error: "Error al enviar la reseña" });
      return false;
    }
  },
  
  // Actualizar término de búsqueda
  setSearchTerm: (term: string) => set({ searchTerm: term }),
}));