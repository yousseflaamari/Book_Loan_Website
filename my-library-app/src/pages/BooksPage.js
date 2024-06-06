import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';

const BooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Books</h2>
      <BookList books={books} />
    </div>
  );
};

export default BooksPage;
