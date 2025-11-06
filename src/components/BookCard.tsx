import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import type { Book } from "../types";

type Props = {
  book: Book;
  onBorrow: (id: string) => void;
  disabled?: boolean;
};

export const BookCard: React.FC<Props> = ({ book, onBorrow, disabled }) => (
  <Card
    sx={{
      width: 220,
      height: 180,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRadius: 3,
      boxShadow: 3,
      bgcolor: "background.paper",
    }}
  >
    <CardContent>
      <Typography variant="subtitle1" fontWeight="bold">
        {book.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {book.author}
      </Typography>
      <Typography variant="body2" mt={1}>
        Copies: {book.copies}
      </Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: "center" }}>
      <Button
        size="small"
        variant="contained"
        onClick={() => onBorrow(book.id)}
        disabled={disabled || book.copies <= 0}
      >
        Borrow
      </Button>
    </CardActions>
  </Card>
);
