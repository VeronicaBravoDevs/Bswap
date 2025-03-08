import { Review } from "@/app/interface/book";

class ReviewService {
  getReviews = async (): Promise<Review[]> => {
    try {
      const response = await fetch("https://equipo-s21-05-m-webapp.onrender.com/reviews");
     
      if (!response.ok) {
        throw new Error(`Error al obtener reseñas: ${response.status} ${response.statusText}`);
      }
     
      const data = await response.json();
      console.log("✅ Reseñas obtenidas:", data);
      
      // Asegurarse de que los datos tengan el formato correcto
      const reviews = Array.isArray(data) ? data : (data.data || []);
      
      return reviews;
    } catch (error) {
      console.error("❌ Error al obtener reseñas:", error);
      return [];
    }
  }

  getReviewById = async (reviewId: string): Promise<Review | null> => {
    try {
      const res = await fetch(`https://equipo-s21-05-m-webapp.onrender.com/reviews/${reviewId}`);
      if (!res.ok) {
        throw new Error(`Error al obtener reseña: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      return data || null;
    } catch (error) {
      console.error("❌ Error al obtener reseña por ID:", error);
      return null;
    }
  }

  getReviewsByBookId = async (bookId: string): Promise<Review[]> => {
    try {
      const res = await fetch(`https://equipo-s21-05-m-webapp.onrender.com/reviews?bookId=${bookId}`);
      if (!res.ok) {
        throw new Error(`Error al obtener reseñas por libro: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("❌ Error al obtener reseñas por libro:", error);
      return [];
    }
  }

  createReview = async (review: Omit<Review, 'id'>): Promise<Review | null> => {
    try {
      const response = await fetch("https://equipo-s21-05-m-webapp.onrender.com/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });
      
      if (!response.ok) {
        throw new Error(`Error al crear reseña: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("✅ Reseña creada:", data);
      return data;
    } catch (error) {
      console.error("❌ Error al crear reseña:", error);
      return null;
    }
  }

  updateReview = async (review: Review): Promise<Review | null> => {
    try {
      const response = await fetch(`https://equipo-s21-05-m-webapp.onrender.com/reviews/${review.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar reseña: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("❌ Error al actualizar reseña:", error);
      return null;
    }
  }

  deleteReview = async (reviewId: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://equipo-s21-05-m-webapp.onrender.com/reviews/${reviewId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar reseña: ${response.status} ${response.statusText}`);
      }
      return true;
    } catch (error) {
      console.error("❌ Error al eliminar reseña:", error);
      return false;
    }
  }
}

export const reviewService = new ReviewService();