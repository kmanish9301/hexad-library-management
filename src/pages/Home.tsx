import React, { useEffect } from "react";
import { fetchBooks } from "../api/libraryService";
import { useLibrary } from "../hooks/useLibrary";
import { BookList } from "../components/BookList";
import { BorrowedList } from "../components/BorrowedList";
import { Grid, Container, Typography, Divider, Box } from "@mui/material";

export const Home: React.FC = () => {
  const { library, borrowed, setLibrary, borrowBook, returnBook } =
    useLibrary();

  useEffect(() => {
    fetchBooks().then(setLibrary);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disableBorrow = (id: string) => {
    if (borrowed.length >= 2) return true;
    return borrowed.some((b) => b.id === id);
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        Library Management
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Library
          </Typography>
          <BookList
            books={library}
            onBorrow={borrowBook}
            disableBorrow={disableBorrow}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Borrowed
          </Typography>
          <BorrowedList borrowed={borrowed} onReturn={returnBook} />
        </Grid>
      </Grid>
    </Container>
  );
};
