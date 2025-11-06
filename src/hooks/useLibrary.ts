import { useLibraryContext } from "../context/LibraryProvider";
import type { Book } from "../types";

export function useLibrary() {
  const { state, dispatch } = useLibraryContext();

  function setLibrary(books: Book[]) {
    dispatch({ type: "SET_LIBRARY", payload: books });
  }

  function borrowBook(id: string) {
    dispatch({ type: "BORROW_BOOK", payload: { id } });
  }

  function returnBook(id: string) {
    dispatch({ type: "RETURN_BOOK", payload: { id } });
  }

  function reset(books?: Book[]) {
    dispatch({ type: "RESET", payload: books });
  }

  return { ...state, setLibrary, borrowBook, returnBook, reset };
}
