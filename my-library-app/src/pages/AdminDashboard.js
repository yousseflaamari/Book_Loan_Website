import React, { useState, useEffect } from 'react';
import { fetchBooks, createBook, updateBook, deleteBook, fetchUsers, createUser, updateUser, deleteUser, fetchLoans, updateLoan, deleteLoan } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [bookForm, setBookForm] = useState({ id: '', titre: '', auteur: '', anneePublication: '', genre: '', resume: '', disponible: true });
  const [userForm, setUserForm] = useState({ id: '', nom: '', email: '', motDePasse: '', role: 'utilisateur' });
  const [loanForm, setLoanForm] = useState({ id: '', bookId: '', userId: '', dateRetour: '' });

  useEffect(() => {
    const getBooksUsersAndLoans = async () => {
      try {
        const bookResponse = await fetchBooks();
        setBooks(bookResponse.data);
        const userResponse = await fetchUsers();
        setUsers(userResponse.data);
        const loanResponse = await fetchLoans();
        setLoans(loanResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getBooksUsersAndLoans();
  }, []);

  const handleBookFormChange = (e) => {
    setBookForm({ ...bookForm, [e.target.name]: e.target.value });
  };

  const handleUserFormChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleLoanFormChange = (e) => {
    setLoanForm({ ...loanForm, [e.target.name]: e.target.value });
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    try {
      if (bookForm.id) {
        await updateBook(bookForm.id, bookForm);
      } else {
        await createBook(bookForm);
      }
      setBookForm({ id: '', titre: '', auteur: '', anneePublication: '', genre: '', resume: '', disponible: true });
      const bookResponse = await fetchBooks();
      setBooks(bookResponse.data);
    } catch (error) {
      console.error('Error submitting book form:', error);
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userForm.id) {
        await updateUser(userForm.id, userForm);
      } else {
        await createUser(userForm);
      }
      setUserForm({ id: '', nom: '', email: '', motDePasse: '', role: 'utilisateur' });
      const userResponse = await fetchUsers();
      setUsers(userResponse.data);
    } catch (error) {
      console.error('Error submitting user form:', error);
    }
  };

  const handleLoanSubmit = async (e) => {
    e.preventDefault();
    try {
      if (loanForm.id) {
        await updateLoan(loanForm.id, loanForm);
      }
      setLoanForm({ id: '', bookId: '', userId: '', dateEmprunt: '', dateRetour: '' });
      const loanResponse = await fetchLoans();
      setLoans(loanResponse.data);
    } catch (error) {
      console.error('Error submitting loan form:', error);
    }
  };

  const handleBookDelete = async (id) => {
    try {
      await deleteBook(id);
      const bookResponse = await fetchBooks();
      setBooks(bookResponse.data);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleUserDelete = async (id) => {
    try {
      await deleteUser(id);
      const userResponse = await fetchUsers();
      setUsers(userResponse.data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleLoanDelete = async (id) => {
    try {
      await deleteLoan(id);
      const loanResponse = await fetchLoans();
      setLoans(loanResponse.data);
    } catch (error) {
      console.error('Error deleting loan:', error);
    }
  };

  const selectBook = (book) => {
    setBookForm({ id: book.id, titre: book.titre, auteur: book.auteur, anneePublication: book.anneePublication, genre: book.genre, resume: book.resume, disponible: book.disponible });
  };

  const selectUser = (user) => {
    setUserForm({ id: user.id, nom: user.nom, email: user.email, motDePasse: '', role: user.role });
  };

  const selectLoan = (loan) => {
    setLoanForm({ id: loan.id, bookId: loan.bookId, userId: loan.userId, dateEmprunt: loan.dateEmprunt, dateRetour: loan.dateRetour });
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="section">
        <h3>Books</h3>
        <form onSubmit={handleBookSubmit} className="form">
          <input type="hidden" name="id" value={bookForm.id} onChange={handleBookFormChange} />
          <input type="text" name="titre" placeholder="Title" value={bookForm.titre} onChange={handleBookFormChange} required />
          <input type="text" name="auteur" placeholder="Author" value={bookForm.auteur} onChange={handleBookFormChange} required />
          <input type="number" name="anneePublication" placeholder="Publication Year" value={bookForm.anneePublication} onChange={handleBookFormChange} required />
          <input type="text" name="genre" placeholder="Genre" value={bookForm.genre} onChange={handleBookFormChange} required />
          <textarea name="resume" placeholder="Summary" value={bookForm.resume} onChange={handleBookFormChange} required />
          <label>
            Available:
            <input type="checkbox" name="disponible" checked={bookForm.disponible} onChange={(e) => setBookForm({ ...bookForm, disponible: e.target.checked })} />
          </label>
          <button type="submit">{bookForm.id ? 'Update' : 'Add'} Book</button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publication Year</th>
              <th>Genre</th>
              <th>Summary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.titre}</td>
                <td>{book.auteur}</td>
                <td>{book.anneePublication}</td>
                <td>{book.genre}</td>
                <td>{book.resume}</td>
                <td>
                  <button className="edit" onClick={() => selectBook(book)}>Edit</button>
                  <button className="delete" onClick={() => handleBookDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Users</h3>
        <form onSubmit={handleUserSubmit} className="form">
          <input type="hidden" name="id" value={userForm.id} onChange={handleUserFormChange} />
          <input type="text" name="nom" placeholder="Name" value={userForm.nom} onChange={handleUserFormChange} required />
          <input type="email" name="email" placeholder="Email" value={userForm.email} onChange={handleUserFormChange} required />
          <input type="password" name="motDePasse" placeholder="Password" value={userForm.motDePasse} onChange={handleUserFormChange} required={!userForm.id} />
          <select name="role" value={userForm.role} onChange={handleUserFormChange}>
            <option value="utilisateur">User</option>
            <option value="administrateur">Admin</option>
          </select>
          <button type="submit">{userForm.id ? 'Update' : 'Add'} User</button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.nom}</td>
                <td>{user.email}</td>
                <td>{user.motDePasse}</td>
                <td>{user.role}</td>
                <td>
                  <button className="edit" onClick={() => selectUser(user)}>Edit</button>
                  <button className="delete" onClick={() => handleUserDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Loans</h3>
        <form onSubmit={handleLoanSubmit} className="form">
          <input type="hidden" name="id" value={loanForm.id} onChange={handleLoanFormChange} />
          <input type="date" name="dateEmprunt" value={loanForm.dateEmprunt} onChange={handleLoanFormChange} required />
          <input type="date" name="dateRetour" value={loanForm.dateRetour} onChange={handleLoanFormChange} required />
          <button type="submit">{loanForm.id ? 'Update' : 'Add'} Loan</button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Book</th>
              <th>User</th>
              <th>Borrowed On</th>
              <th>Due On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.Book ? loan.Book.titre : 'Unknown Book'}</td>
                <td>{loan.User ? loan.User.nom : 'Unknown User'}</td>
                <td>{loan.dateEmprunt}</td>
                <td>{loan.dateRetour}</td>
                <td>
                  <button className="edit" onClick={() => selectLoan(loan)}>Edit</button>
                  <button className="delete" onClick={() => handleLoanDelete(loan.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>





    </div>
  );
};

export default AdminDashboard;