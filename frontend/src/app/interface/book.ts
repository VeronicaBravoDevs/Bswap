interface Image {
  id: string;
  url: string;
}

interface Audio {
  id: string;
  url: string;
}

interface Review {
  id: string;
  userId: string;
  comment?: string;
  audio?: Audio;
}

export interface Book {
  id?: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  published?: Date;
  publisher?: string;
  cover?: string; //Image [0]
  image: Image [];
  audio?: Audio[];
  genre: string;
  exchange_available: boolean;
  status: "pending" | "approved" | "rejected";
  libraryId: string | null;
  userId: string;
  reviews: Review[];
}


