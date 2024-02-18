"use client";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import axios from "axios";
import { useEffect, useState } from "react";

type Book = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
};

const BookIndex = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/books")  // Book全件取得のRailsのAPIを叩いている
      .then((res) => res.json())
      .then((books) => setBooks(books));
  }, []);

  const selectedBook = books.find((book) => book.id === selectedBookId);

  const handleShowDetails = (id?: number) => setSelectedBookId(id || null);

  const deleteBook = async (id: number) => {
    await axios.delete(`http://localhost:3000/books/${id}`); // 指定したBookを削除するRailsのAPIを叩いている
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <>
      <Typography variant="h4" align="center">
        Book List
      </Typography>
      <TableContainer>
        <Table sx={{ maxWidth: 650 }} align="center">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => {
              return (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.body}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleShowDetails(book.id)}
                    >
                      SHOW
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<DeleteForeverIcon />}
                      onClick={() => deleteBook(book.id)}
                    >
                      DESTROY
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedBook && (
        <Modal open>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "lightblue",
              p: 4,
              borderRadius: "0.5em",
            }}
          >
            <Box component="p">ID: {selectedBook.id}</Box>
            <Box component="p">Title: {selectedBook.title}</Box>
            <Box component="p">Body: {selectedBook.body}</Box>
            <Box component="p">CreatedAt: {selectedBook.created_at}</Box>
            <Box component="p">UpdatedAt: {selectedBook.updated_at}</Box>
            <Button onClick={() => handleShowDetails()} variant="contained">
              Close ✖️
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default BookIndex;

