import React from 'react';

const BookList = ({ books }) => {
  return (
    <ul>
      {books.map(book => (
        <li key={book.id}>
          {book.titre} by {book.auteur}
        </li>
      ))}
    </ul>
  );
};

export default BookList;
