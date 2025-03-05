export interface CreateBookRequest {
  title: string;
  author: string;
  description: string;
  isbn: string;
  genre: string;
  publisher: string;
  published: Date | null;
  // cover?: Image;
  // images?: Image[];
  // exchange_available: boolean;
  // categoryBooks: string | null;
}

// export interface Image {
//   file: File;
// }
