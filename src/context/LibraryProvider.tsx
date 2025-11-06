import { createContext, useReducer, type ReactNode, useContext } from "react";
import type { Book, BorrowedBook } from "../types";

type State = {
  library: Book[];
  borrowed: BorrowedBook[];
};

type Action =
  | { type: "SET_LIBRARY"; payload: Book[] }
  | { type: "BORROW_BOOK"; payload: { id: string } }
  | { type: "RETURN_BOOK"; payload: { id: string } }
  | { type: "RESET"; payload?: Book[] };

const initialState: State = { library: [], borrowed: [] };

const MAX_BORROW = 2;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_LIBRARY":
      return { ...state, library: action.payload };
    case "BORROW_BOOK": {
      const { id } = action.payload;
      const book = state.library.find((b) => b.id === id);
      if (!book || book.copies <= 0) return state; // nothing to borrow
      // borrowing limit
      if (state.borrowed.length >= MAX_BORROW) return state;
      // ensure a user can't borrow same copy twice
      if (state.borrowed.some((b) => b.id === id)) return state;

      const newLibrary = state.library
        .map((b) => (b.id === id ? { ...b, copies: b.copies - 1 } : b))
        .filter((b) => (b.copies > 0 ? true : true)); // keep item with 0 copies but show as 0

      const newBorrowed: BorrowedBook[] = [
        ...state.borrowed,
        {
          id: book.id,
          title: book.title,
          author: book.author,
          borrowedAt: new Date().toISOString(),
        },
      ];
      return { ...state, library: newLibrary, borrowed: newBorrowed };
    }
    case "RETURN_BOOK": {
      const { id } = action.payload;
      // check borrowed
      if (!state.borrowed.some((b) => b.id === id)) return state;
      const newBorrowed = state.borrowed.filter((b) => b.id !== id);

      // restore copy in library: if exists increase copies else add new
      const libIndex = state.library.findIndex((b) => b.id === id);
      let newLibrary: Book[];
      if (libIndex >= 0) {
        newLibrary = state.library.map((b) =>
          b.id === id ? { ...b, copies: b.copies + 1 } : b
        );
      } else {
        // the book was removed (copies 0) — re-add with 1 copy
        // NOTE: borrowed had title and author, but not copies, add copies:1
        const returned = state.borrowed.find((x) => x.id === id)!;
        newLibrary = [
          ...state.library,
          {
            id: returned.id,
            title: returned.title,
            author: returned.author,
            copies: 1,
          },
        ];
      }
      return { ...state, library: newLibrary, borrowed: newBorrowed };
    }
    case "RESET":
      return { library: action.payload ?? [], borrowed: [] };
    default:
      return state;
  }
}

const LibraryContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <LibraryContext.Provider value={{ state, dispatch }}>
      {children}
    </LibraryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useLibraryContext() {
  const ctx = useContext(LibraryContext);
  if (!ctx)
    throw new Error("useLibraryContext must be used within LibraryProvider");
  return ctx;
}
