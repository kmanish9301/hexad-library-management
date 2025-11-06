import type { Book } from "../types";

const initialBooks: Book[] = [
  { id: "b1", title: "Clean Code", author: "Robert C. Martin", copies: 1 },
  { id: "b2", title: "Eloquent JS", author: "Marijn Haverbeke", copies: 2 },
  { id: "b3", title: "You Don't Know JS", author: "Kyle Simpson", copies: 1 },
];

export function getInitialBooks() {
  return initialBooks.map((b) => ({ ...b }));
}

export async function fetchBooks(): Promise<Book[]> {
  return Promise.resolve(getInitialBooks());
}
