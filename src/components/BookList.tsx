import React from "react";
import Grid from "@mui/material/Grid";
import { BookCard } from "./BookCard";
import type { Book } from "../types";

type Props = {
  books: Book[];
  onBorrow: (id: string) => void;
  disableBorrow?: (id: string) => boolean;
};

export const BookList: React.FC<Props> = ({
  books,
  onBorrow,
  disableBorrow,
}) => {
  if (!books.length)
    return <div data-testid="empty-library">Library is empty</div>;

  return (
    <Grid container spacing={2} data-testid="library-section">
      {books.map((b) => (
        <Grid item key={b.id}>
          <BookCard
            book={b}
            onBorrow={onBorrow}
            disabled={disableBorrow?.(b.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
