import React, { useState } from 'react';
import { useReviewStore } from '../store/reviewStore';
import { validateReviewForm, ReviewFormData } from '../schemas/reviewSchema';
import { IoStar, IoStarOutline } from 'react-icons/io5';

interface ReviewFormProps {
  userId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ userId }) => {
  const { books, addReview } = useReviewStore();

  const [formData, setFormData] = useState<ReviewFormData>({
    bookId: '',
    title: '',
    author: '',
    content: '',
    rating: 0,
    userId: userId || 'usuario1', // ID del usuario logueado o valor por defecto
  });
  
  const [showCustomTitleInput, setShowCustomTitleInput] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // libro nuevo???
    if (name === 'bookId') {
      if (value === 'new') {
        setShowCustomTitleInput(true);
      } else {
        setShowCustomTitleInput(false);
        
        const selectedBook = books.find(book => book.id === value);
        if (selectedBook) {
          setFormData(prev => ({
            ...prev,
            bookId: value,
            title: selectedBook.title,
            author: selectedBook.author,
          }));
          return;
        }
      }
    }
    
 
    setFormData(prev => ({ ...prev, [name]: value }));
    
 
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Fx para seleccion de estrellas
  const handleRatingSelect = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    

    if (formErrors.rating) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.rating;
        return newErrors;
      });
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    const validation = validateReviewForm(formData);
    
    if (!validation.success) {
      setFormErrors(validation.errors || {});
      return;
    }
    
    setIsSubmitting(true);
    
    try {

      const reviewToSubmit = {
        bookId: showCustomTitleInput ? `new-${Date.now()}` : formData.bookId,
        userId: formData.userId,
        rating: formData.rating,
        content: formData.content,
        publication_date: new Date().toISOString(),
        comments: "",
        reactions: ""
      };
      
 
      const success = await addReview(reviewToSubmit);
      
      if (success) {     
        setFormData({
          bookId: '',
          title: '',
          author: '',
          content: '',
          rating: 0,
          userId: formData.userId,
        });
        setShowCustomTitleInput(false);
        setFormErrors({});
      } else {
        setFormErrors({ form: "No se pudo guardar la reseña. Intentalo de nuevo!." });
      }
    } catch (error) {
        //aca sumar un modal
      console.error("Error al enviar la reseña:", error);
      setFormErrors({ form: "Ocurrió un error al enviar la reseña." });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="border border-gray-500 m-4 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold w-full text-center mb-4">Agregar reseña</h2>
      
      {formErrors.form && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {formErrors.form}
        </div>
      )}
      
      <form className="space-y-4" onSubmit={handleSubmit}>
       
        <div>
          <select
            name="bookId"
            className={`w-full p-2 border rounded-lg ${formErrors.bookId ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.bookId}
            onChange={handleInputChange}
          >
            <option value="">Selecciona un libro</option>
            {books.map(book => (
              <option key={book.id} value={book.id}>{book.title} - {book.author}</option>
            ))}
            <option value="new">Otro libro no listado</option>
          </select>
          {formErrors.bookId && <p className="text-red-500 text-sm mt-1">{formErrors.bookId}</p>}
        </div>
        
       
        {showCustomTitleInput && (
          <>
            <div>
              <input
                className={`w-full p-2 border rounded-lg ${formErrors.title ? 'border-red-500' : 'border-gray-300'}`}
                type="text"
                name="title"
                placeholder="Título del libro"
                value={formData.title}
                onChange={handleInputChange}
              />
              {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
            </div>
            
            <div>
              <input
                className={`w-full p-2 border rounded-lg ${formErrors.author ? 'border-red-500' : 'border-gray-300'}`}
                type="text"
                name="author"
                placeholder="Nombre del Autor"
                value={formData.author}
                onChange={handleInputChange}
              />
              {formErrors.author && <p className="text-red-500 text-sm mt-1">{formErrors.author}</p>}
            </div>
          </>
        )}
        
     
        <div>
          <textarea
            className={`w-full p-2 border rounded-lg h-32 ${formErrors.content ? 'border-red-500' : 'border-gray-300'}`}
            name="content"
            placeholder="Escribe tu reseña aquí"
            value={formData.content}
            onChange={handleInputChange}
          />
          {formErrors.content && <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>}
        </div>

        <div>
          <div className="flex justify-center text-2xl mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="cursor-pointer"
                onClick={() => handleRatingSelect(star)}
              >
                {star <= formData.rating ? (
                  <IoStar className="text-yellow-400 w-8 h-8" />
                ) : (
                  <IoStarOutline className="text-gray-200 w-8 h-8" />
                )}
              </span>
            ))}
          </div>
          {formErrors.rating && (
            <p className="text-red-500 text-sm text-center">{formErrors.rating}</p>
          )}
        </div>
        
      
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'ENVIANDO...' : 'ENVIAR RESEÑA'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;