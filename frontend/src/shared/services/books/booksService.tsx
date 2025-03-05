import { Book } from "@/app/interface/book";

class BootServices {
  Books: Book[] = [];

  getBooks = async (): Promise<Book[]> => {

    const response = await fetch("https://equipo-s21-05-m-webapp.onrender.com/books").then((res) => res.json()).then((res) => {

      const { data } = res as { data: Book[] };

      return data ?? [];
    }
    ).catch((error) => {
      console.error("❌ ~ getBooks ~ error:", error);
      return [];
    }
    );

    return response;
  }

  getBookById = async (bookId: string) => {
    try {
      const res = await fetch(`https://equipo-s21-05-m-webapp.onrender.com/books/${bookId}`);

      if (!res.ok) {
        throw new Error(`Error fetching book: ${res.status} ${res.statusText}`);
      }

      const { data } = await res.json();

      return data ?? {};
    } catch (error) {
      console.error("❌ ~ getBookById ~ error:", error);
      return {};
    }
  }

  setBook = (book: Book) => {
    fetch("https://equipo-s21-05-m-webapp.onrender.com/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    }).then((res) => {
      res.json();
    }
    ).then((response) => {
      console.log("✅ ~ setBook ~ response:", response);
    }).catch((error) => {
      console.error("❌ ~ setBook ~ error:", error);
    }
    );
  }

  deleteBook = (bookId: string) => {
    fetch(`https://equipo-s21-05-m-webapp.onrender.com/books/${bookId}`, {
      method: "DELETE",
    }).then((res) => {
      res.json();
    }
    ).then((response) => {
      console.log("✅ ~ deleteBook ~ response:", response);
    }).catch((error) => {
      console.error("❌ ~ deleteBook ~ error:", error);
    }
    );
  }

  updateBook = (book: Book) => {
    fetch(`https://equipo-s21-05-m-webapp.onrender.com/books/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    }).then((res) => {
      res.json();
    }
    ).then((response) => {
      console.log("✅ ~ updateBook ~ response:", response);
    }).catch((error) => {
      console.error("❌ ~ updateBook ~ error:", error);
    }
    );
  }
}

export const bootServices = new BootServices();