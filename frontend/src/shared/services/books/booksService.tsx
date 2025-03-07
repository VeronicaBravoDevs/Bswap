import { Book } from "@/app/interface/book";


const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

class BootServices {
  Books: Book[] = [];
  
  getBooks = async (quantity?: number): Promise<Book[]> => {
    const url = quantity
    ? `${BASE_URL}/books?quantity=${quantity}`
      : `${BASE_URL}/books`;

    const response = await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const { data } = res as { data: Book[] };
        return data ?? [];
      })
      .catch((error) => {
        console.error("❌ ~ getBooks ~ error:", error);
        return [];
      });

    return response;
  };

  getBookById = async (bookId: string) => {
    try {
      const res = await fetch(
        `${BASE_URL}/books/${bookId}`
      );

      if (!res.ok) {
        throw new Error(`Error fetching book: ${res.status} ${res.statusText}`);
      }

      const { data } = await res.json();

      return data ?? {};
    } catch (error) {
      console.error("❌ ~ getBookById ~ error:", error);
      return {};
    }
  };

  setBook = (book: Book) => {
    console.log("first")
    fetch(`${BASE_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((res) => {
        res.json();
      })
      .then((response) => {
        console.log("✅ ~ setBook ~ response:", response);
      })
      .catch((error) => {
        console.error("❌ ~ setBook ~ error:", error);
      });
  };

  deleteBook = (bookId: string) => {
    fetch(`${BASE_URL}/books/${bookId}`, {
      method: "DELETE",
    })
      .then((res) => {
        res.json();
      })
      .then((response) => {
        console.log("✅ ~ deleteBook ~ response:", response);
      })
      .catch((error) => {
        console.error("❌ ~ deleteBook ~ error:", error);
      });
  };

  updateBook = (book: Book) => {
    fetch(`${BASE_URL}/books/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((res) => {
        res.json();
      })
      .then((response) => {
        console.log("✅ ~ updateBook ~ response:", response);
      })
      .catch((error) => {
        console.error("❌ ~ updateBook ~ error:", error);
      });
  };
}

export const bootServices = new BootServices();