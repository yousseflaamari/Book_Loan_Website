import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Adjust the baseURL to your backend server
});

// Books API
export const fetchBooks = () => api.get('/books');
export const fetchBookById = (id) => api.get(`/books/${id}`);
export const createBook = (bookData) => api.post('/books', bookData);
export const updateBook = (id, bookData) => api.put(`/books/${id}`, bookData);
export const deleteBook = (id) => api.delete(`/books/${id}`);

// Users API
export const fetchUsers = () => api.get('/users');
export const createUser = (userData) => api.post('/users/register', userData);
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const loginUser = (loginData) => api.post('/users/login', loginData);

// Loans API
export const fetchLoans = () => api.get('/loans');
/*export const fetchLoans = async (token) => {
  return axios.get('/loans', {
    headers: { Authorization: `Bearer ${token}` }
  });
};*/
export const fetchLoanById = (id) => api.get(`/loans/${id}`);
export const createLoan = (loanData) => api.post('/loans', loanData);
export const updateLoan = (id, loanData) => api.put(`/loans/${id}`, loanData);
export const deleteLoan = (id) => api.delete(`/loans/${id}`);

/*export const fetchBooks = async () => {
  return axios.get('/api/books');
};

export const fetchLoans = async (token) => {
  return axios.get('/api/loans', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createLoan = async (bookId, token) => {
  return axios.post('/api/loans', { bookId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};*/
export default api;
