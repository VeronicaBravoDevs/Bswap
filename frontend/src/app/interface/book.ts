export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  published: Date;
  publisher: string;
  cover?: string; //Image [0]
  image: Image [];
  audio: Audio[];
  genre: string;
  exchange_available: boolean;
  status: "pending" | "approved" | "rejected";
  libraryId: string | null;
  userId: string; 
  reviews: Review[];
}

export interface Review{
  id: string;
  user: string;
  comment: string;
}

export interface Image{
  id: string;
  BookId: string;
  url: string;
}

export interface Audio{
  id: string;
  BookId: string;
  url: string;
}