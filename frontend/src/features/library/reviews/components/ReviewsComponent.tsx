"use client"

import React, { useState } from "react";
import { IoSearchOutline, IoStarOutline } from "react-icons/io5";
import mockData from "../../../../../public/mock/mockDataReviews.json";
import Image from "next/image";

const ReviewsComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState(" ");

    const allReviews = mockData.books.flatMap(book =>
        book.reviews.map(review => ({
            ...review,
            bookTitle: book.title,
            bookAuthor: book.author,
            bookCover: book.cover
        }))
    );

    const filteredReviews = allReviews.filter(
        review =>
            review.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.bookAuthor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen">
            <div className="bg-blue-600 text-white p-6 text-center">
                <h1 className="text-3x1 font-bold mb-4"> Reseñas de lectores</h1>
                <p>Cada libro es una puerta a un mundo nuevo. Descubre qué opinan otros lectores sobre sus historias favoritas</p>
            </div>

            <div className="w-full px-4 py-4 relative">
                <form
                    className="relative w-full px-4 py-4"
                    onSubmit={(e) => e.preventDefault()}>
                        <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar por título o autor"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}/>
                    <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </form>
            </div>

            {filteredReviews.map((review, index) => (
                <div key={review.id} className="border border-gray-400 m-4 p-4 rounded-lg">
                    <div>
                        <h2 className="text-2x1 font-semibold mb-2">Reseña de intercambio</h2>
                        <div className="flex justify-between mb-2">
                            <div>
                                <h3 className="font-bold">Titulo:</h3>
                                <p>{review.bookTitle}</p>
                            </div>
                            <div>
                                <h3 className="font-bold">Estado:</h3>
                                <p>{review.exchange_status}</p>
                            </div>
                        </div>
                        <h3 className="font-bold">Subido por <span>{review.user.name}</span></h3>
                    </div>
                    <section className="grid grid-cols-3 gap-4 mt-4">
                        <div className="col-span-1 grid grid-cols-5">
                        <div className="col-span-1 relative w-full aspect-square">
                                <Image
                                    src={review.user.profile_picture}
                                    alt={review.user.name}
                                    fill
                                    className="rounded-full object-cover"                                    
                                />
                            </div>
                            <div className="col-span-4 pl-2">
                                <p className="font-semibold">{review.user.name}</p>
                                <p>{`${review.user.city}, ${review.user.country}`}</p>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <div className="flex text-yellow-400 mb-2">
                                {[...Array(5)].map((_, starIndex) => (
                                    <IoStarOutline
                                        className={`w-6 h-6 ${starIndex < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                                        key={starIndex} />
                                ))}
                            </div>
                            <p>{review.comment}</p>
                        </div>
                    </section>
                </div>
            ))}

            <div className="border border-gray-300 m-4 p-4 rounded-lg">
                <h2 className="text-2x1 font-semibold w-full text-center mb-4"> Agregar reseña</h2>
                <form className="space-y-4">
                    <input
                        className="w-full p-2 border rounded-lg"
                        type="text"
                        placeholder="Titulo del libro" />
                    <input
                        className="w-full p-2 border rounded-lg"
                        type="text"
                        placeholder="Nombre del Autor" />
                    <textarea
                        className="w-full p-2 border rounded-lg h-32"
                        placeholder="Escribe tu reseña aqui" />
                    <div className="flex justify-center text-yellow-400 mb-4">
                        {[...Array(5)].map((_, index) => (
                            <IoStarOutline
                                className="w-8 h-8 text-gray-200"
                                key={index} />
                        ))}
                    </div>

                    <button
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800"
                        type="submit">
                        ENVIAR RESEÑA
                    </button>
                </form>
            </div>
        </div>
    )
};

export default ReviewsComponent
