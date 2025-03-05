"use client";
import React, { useState } from "react";

const CreateBookForm: React.FC = () => {
  const [ loading, setLoading ] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, "0");
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
    const fecha = dia + "/" + mes + "/" + fechaActual.getFullYear();
    console.log("Fecha actual:", fecha);

    try {

      const bodyFetch = new FormData(event.target as HTMLFormElement);

      const image1 = bodyFetch.get("image1");
      const image2 = bodyFetch.get("image2");
      const image3 = bodyFetch.get("image3");

      if (image1 instanceof File && (image1.size === 0)) {
        bodyFetch.delete("image1");
      }
      if (image2 instanceof File && (image2.size === 0)) {
        bodyFetch.delete("image2");
      }
      if (image3 instanceof File && (image3.size === 0)) {
        bodyFetch.delete("image3");
      }

      //const bookResponse = await fetch("https://equipo-s21-05-m-webapp.onrender.com/books", {
      const bookResponse = await fetch("http://localhost:3001/books", {
        method: "POST",
        //headers: { "Content-Type": "multipart/form-data" },
        body: bodyFetch,
      });

      if (!bookResponse.ok) throw new Error("Error al crear el libro");
      const book = await bookResponse.json();
      console.log("Libro creado:", book);

      alert("Libro e imágenes subidos correctamente ✅");
    } catch (error) {
      console.error("❌ Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={ handleSubmit } className="max-w-2xl mx-auto [&>div]:flex [&>div]:flex-col [&>div]:py-4">
      <div>
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" name="title" required />
      </div>
      <div>
        <label htmlFor="author">Autor:</label>
        <input type="text" id="author" name="author" required />
      </div>
      <div>
        <label htmlFor="publisher">Editorial:</label>
        <input type="text" id="publisher" name="publisher" />
      </div>
      <div>
        <label htmlFor="genre">Género:</label>
        <input type="text" id="genre" name="genre" required />
      </div>
      <div>
        <label htmlFor="description">Sinopsis:</label>
        <textarea id="description" name="description" required />
      </div>
      <div>
        <label htmlFor="isbn">ISBN:</label>
        <input type="text" id="isbn" name="isbn" required />
      </div>
      <div>
        <label htmlFor="published">Fecha de Publicación:</label>
        <input type="date" id="published" name="published" />
      </div>

      {/* Imágenes */ }
      <div>
        <label htmlFor="image1">Imagen 1:</label>
        <input type="file" id="image1" name="image1" accept="image/*" />
      </div>
      <div>
        <label htmlFor="image2">Imagen 2:</label>
        <input type="file" id="image2" name="image2" accept="image/*" />
      </div>
      <div>
        <label htmlFor="image3">Imagen 3:</label>
        <input type="file" id="image3" name="image3" accept="image/*" />
      </div>
      <button type="submit" disabled={ loading }>
        { loading ? "Subiendo..." : "Crear Libro y Subir Imágenes" }
      </button>
    </form>
  );
};

export default CreateBookForm;
