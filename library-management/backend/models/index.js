// backend/models/index.js
const User = require('./user');
const Book = require('./book');
const Loan = require('./loan');

module.exports = {
    User,
    Book,
    Loan
};
