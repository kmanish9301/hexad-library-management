import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import type { BorrowedBook } from "../types";

export const BorrowedList: React.FC<{
  borrowed: BorrowedBook[];
  onReturn: (id: string) => void;
}> = ({ borrowed, onReturn }) => {
  if (!borrowed.length)
    return (
      <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary">
          No borrowed books
        </Typography>
      </Paper>
    );

  return (
    <Paper sx={{ p: 1, borderRadius: 2 }}>
      <List>
        {borrowed.map((b) => (
          <ListItem
            key={b.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="return"
                onClick={() => onReturn(b.id)}
              >
                <RestoreIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={b.title}
              secondary={`by ${b.author}`}
              primaryTypographyProps={{ fontWeight: "bold" }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
