import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookCard.css'; // Ensure you have the necessary CSS

const fetchBookImage = async (title) => {
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
    if (response.data.docs && response.data.docs.length > 0) {
      const book = response.data.docs[0];
      const coverId = book.cover_i;
      if (coverId) {
        return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
      }
    }
  } catch (error) {
    console.error('Error fetching book image:', error);
  }
  return 'default-image.png'; // Fallback image in case no image is found
};

const BookCard = ({ book, onLoan }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const image = await fetchBookImage(book.titre);
      setImageSrc(image);
    };

    fetchImage();
  }, [book.titre]);

  return (
    <article className="featured__card swiper-slide">
      <img src={imageSrc} alt={book.titre} className="featured__img" />
      <h2 className="featured__title">{book.titre}</h2>
      <div className="featured__prices">
        <span className="featured__discount">{book.auteur}</span>
        <span className="featured__price">{book.genre}</span>
      </div>
      <button className="button" onClick={() => onLoan(book.id)}>Loan</button>
      <div className="featured__actions">
        <button><i className="ri-search-line"></i></button>
        <button><i className="ri-heart-3-line"></i></button>
        <button><i className="ri-eye-line"></i></button>
      </div>
    </article>
  );
};

export default BookCard;
