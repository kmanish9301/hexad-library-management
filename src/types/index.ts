export type Book = {
  id: string;
  title: string;
  author: string;
  copies: number;
};

export type BorrowedBook = {
  id: string;
  title: string;
  author: string;
  borrowedAt: string;
};
