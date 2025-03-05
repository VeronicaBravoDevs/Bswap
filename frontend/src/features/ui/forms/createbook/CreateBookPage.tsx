"use client";
import { CreateBookRequest } from "@/app/interface/createBookRequest";
import React, { useState } from "react";

const CreateBookForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [published, setPublished] = useState("");
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const newBook: CreateBookRequest = {
        title,
        author,
        description,
        isbn,
        genre,
        publisher,
        published: new Date(published), // No funciona
      };

      const bookResponse = await fetch("https://equipo-s21-05-m-webapp.onrender.com/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (!bookResponse.ok) throw new Error("Error al crear el libro");
      const book = await bookResponse.json();

      const uploadImage = async (image: File | null) => {
        if (!image) return;
        const formData = new FormData();
        formData.append("file", image);
        formData.append("bookId", book.data.id);

        const uploadResponse = await fetch("https://equipo-s21-05-m-webapp.onrender.com/uploads", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) throw new Error("Error al subir imagen");
      };

      await Promise.all([uploadImage(image1), uploadImage(image2), uploadImage(image3)]);

      alert("Libro e imágenes subidos correctamente ✅");
    } catch (error) {
      console.error("❌ Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto [&>div]:flex [&>div]:flex-col [&>div]:py-4">
      <div>
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="author">Autor:</label>
        <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="publisher">Editorial:</label>
        <input type="text" id="publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
      </div>
      <div>
        <label htmlFor="genre">Género:</label>
        <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="description">Sinopsis:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="isbn">ISBN:</label>
        <input type="text" id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="published">Fecha de Publicación:</label>
        <input type="date" id="published" value={published} onChange={(e) => setPublished(e.target.value)} />
      </div>

      {/* Imágenes */}
      <div>
        <label htmlFor="image1">Imagen 1:</label>
        <input type="file" id="image1" accept="image/*" onChange={(e) => handleImageChange(e, setImage1)} />
      </div>
      <div>
        <label htmlFor="image2">Imagen 2:</label>
        <input type="file" id="image2" accept="image/*" onChange={(e) => handleImageChange(e, setImage2)} />
      </div>
      <div>
        <label htmlFor="image3">Imagen 3:</label>
        <input type="file" id="image3" accept="image/*" onChange={(e) => handleImageChange(e, setImage3)} />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Subiendo..." : "Crear Libro y Subir Imágenes"}
      </button>
    </form>
  );
};

export default CreateBookForm;
