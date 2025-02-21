export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  published: Date;
  publisher: string;
  image: string;
  genre: string;
  exchange_available: boolean;
  status: "pending" | "approved" | "rejected";
  libraryId: string | null;
  userId: string;
}
