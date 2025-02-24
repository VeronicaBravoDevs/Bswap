"use client";

import { useBooks } from "@/shared/hooks/useBooks";
import CardBook from "../common/card-book";
import Error from "../common/Error";
import Loading from "../common/Loading";

export default function CardList() {
  const { data: books, loading, error } = useBooks();

  if (loading) return <Loading />;
  if (error)
    return (
      <>
        <Error />
        <p>{error}</p>
      </>
    );

  return (
      <div className="flex flex-wrap justify-around gap-8 my-16">
        {books?.length === 0 ? <div>Aún no hay libros cargados</div> : books?.map((book) => <CardBook key={book.id} book={book} />)}
      </div>
  );
}
