"use client";
import React, { useState } from "react";

const CreateBookForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

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

      if (image1 instanceof File && image1.size === 0) {
        bodyFetch.delete("image1");
      }
      if (image2 instanceof File && image2.size === 0) {
        bodyFetch.delete("image2");
      }
      if (image3 instanceof File && image3.size === 0) {
        bodyFetch.delete("image3");
      }

      const bookResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/books`,
        {
          method: "POST",
          //headers: { "Content-Type": "multipart/form-data" },
          body: bodyFetch,
        }
      );

      if (!bookResponse.ok) throw new Error("Error al crear el libro");
      const book = await bookResponse.json();
      console.log("Libro creado:", book);

    } catch (error) {
      console.error("❌ Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto [&>div]:flex [&>div]:flex-col [&>div]:py-2"
    >
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Título"
          className="border-4 border-gray-200 px-2"
          required
        />
      </div>
      <div>
        <label htmlFor="author">Autor:</label>
        <input
          type="text"
          id="author"
          name="author"
          placeholder="Autor"
          className="border-4 border-gray-200 px-2"
          required
        />
      </div>
      <div>
        <label htmlFor="publisher">Editorial:</label>
        <input
          type="text"
          id="publisher"
          name="publisher"
          placeholder="Editorial"
          className="border-4 border-gray-200 px-2"
          required
        />
      </div>
      <div>
        <label htmlFor="genre">Género:</label>
        <select
          id="genre"
          name="genre"
          className="border-4 border-gray-200 p-2"
          required
        >
          <option value="">Selecciona un género</option>
          <option value="fantasia">Fantasía</option>
          <option value="ciencia-ficcion">Ciencia Ficción</option>
          <option value="misterio">Misterio</option>
          <option value="terror">Terror</option>
          <option value="romance">Romance</option>
          <option value="aventura">Aventura</option>
          <option value="historia">Historia</option>
        </select>
      </div>
      <div>
        <label htmlFor="description">Sinopsis:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Escribe aqui la Sinopsis"
          className="border-4 border-gray-200 pt-2 pl-2"
          required
        />
      </div>
      <div>
        <label htmlFor="isbn">ISBN:</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          placeholder="9780545069670"
          className="border-4 border-gray-200 px-2"
          required
        />
      </div>
      <div>
        <label htmlFor="published">Fecha de Publicación:</label>
        <input
          type="date"
          id="published"
          name="published"
          className="border-4 border-gray-200 px-2"
        />
      </div>

      {/* Imágenes */}
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
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg w-28 mr-4"
        >
          {loading ? "Subiendo..." : "Agregar"}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-400 text-white py-2 px-4 rounded-lg w-28"
        >
          {loading ? "Subiendo..." : "Cancelar"}
        </button>
    </form>
  );
};

export default CreateBookForm;
