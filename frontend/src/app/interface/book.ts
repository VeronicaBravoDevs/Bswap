export interface Image {
  id: string;
  url: string;
}

export interface Audio {
  id: string;
  url: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  published: Date;
  publisher: string;
  cover: Image;
  images: Image;
  genre: string;
  exchange_available: boolean;
  status: "pending" | "approved" | "rejected";
  libraryId: string | null;
  userId: string;
  reviews: Review[];
}

export interface Review{
  id: string;
  userId: string;
  comment?: string;
  audio?: Audio;
}
