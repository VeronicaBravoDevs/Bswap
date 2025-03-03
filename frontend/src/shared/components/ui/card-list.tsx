"use client";

import { useBooks } from "@/shared/hooks/useBooks";
<<<<<<< HEAD
import CardBook from "../common/card-book";
import Error from "../common/Error";
import Loading from "@/shared/components/common/Loading";
=======
import CardBook from "@/shared/components/common/card-book";
import Loading from "@/shared/components/common/Loading";
import Error from "@/shared/components/common/Error";
>>>>>>> frontend-develop-veronica_loginAndRegister

const CardList: React.FC = () => {
  const { data: books, loading, error } = useBooks();

  if (loading) return <Loading />;
  if(error) return <Error message={error}/>;

  return (
    <div className="flex flex-wrap justify-around gap-8 my-16">
      { books.length === 0 ? (
        <div>Aún no hay libros cargados</div>
      ) : (
        books.map((book) => <CardBook key={ book.id } book={ book } />)
      ) }
    </div>
  );
}

export default CardList;
