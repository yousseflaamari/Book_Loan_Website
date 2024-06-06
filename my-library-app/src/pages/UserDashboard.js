import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../services/api';
import axios from 'axios';
import BookCard from '../components/BookCard';
import Header from '../components/Header'; // Import the Header component
import './UserDashboard.css';
import Home from '../components/Home';
import Footer from '../components/Footer';


const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loans, setLoans] = useState([]);

  const fetchBooksData = async () => {
    try {
      const response = await fetchBooks();
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchLoans = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/loans', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLoans(response.data);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  useEffect(() => {
    fetchBooksData();
    fetchLoans();
  }, []);

  const availableBooks = books.filter(book => book.disponible);

  const handleLoan = async (bookId) => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      
      const today = new Date();
      const dateEmprunt = today.toISOString().split('T')[0];
      const dateRetour = new Date(today.setDate(today.getDate() + 14)).toISOString().split('T')[0];

      const response = await axios.post('http://localhost:3001/api/loans', { userId, bookId, dateEmprunt, dateRetour }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 201) {
        await fetchBooksData();
        await fetchLoans();
      }
    } catch (error) {
      console.error('Error processing loan:', error);
    }
  };

  const handleReturn = async (loanId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:3001/api/loans/return/${loanId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setLoans(loans.filter(loan => loan.id !== loanId));
        await fetchBooksData();
      }
    } catch (error) {
      console.error('Error processing return:', error);
    }
  };

  return (
    <div className='contenair_user'>
      
       {/* Render the Header component */}
      <div>
      <Header />
    
      <Home />
      <h2>User Dashboard</h2>
      <div>
        <h3>Available Books</h3>
        <div className="book-list">
          {availableBooks.map(book => (
            <BookCard key={book.id} book={book} onLoan={handleLoan} />
          ))}
        </div>
      </div>
      <div>
        <h3>Your Loans</h3>

        <table className="table">
          <thead>
            <tr>
              <th>Book</th>
              <th>Due On</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>       {loan.Book ? loan.Book.titre : 'Unknown Book'} </td>
                <td>{loan.dateRetour}</td>
                <td><button onClick={() => handleReturn(loan.id)}>Return</button></td>
                
              </tr>
            ))}
          </tbody>
        </table>


        
      </div>
      <Footer />
      </div>
      
    </div>
  );
};

export default UserDashboard;
