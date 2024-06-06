const  Loan  = require('../models/loan');
const  User  = require('../models/user');
const  Book  = require('../models/book');




exports.createLoan = async (req, res) => {
  try {
    const { userId, bookId, dateEmprunt, dateRetour } = req.body;

    // Check if the book is already loaned
    const book = await Book.findByPk(bookId);
    if (!book.disponible) {
      return res.status(400).json({ error: 'Book is not available for loan' });
    }

    // Create a loan
    const loan = await Loan.create({
      idUtilisateur: userId,
      idLivre: bookId,
      dateEmprunt,
      dateRetour
    });

    // Update book availability
    book.disponible = false;
    await book.save();

    res.status(201).json(loan);
  } catch (error) {
    console.error('Error creating loan:', error);
    res.status(500).json({ error: 'Error creating loan' });
  }
};

/*exports.createLoan = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id; // Assuming the user is authenticated and userId is available

    // Find the book
    const book = await Book.findByPk(bookId);
    if (!book || !book.disponible) {
      return res.status(404).json({ error: 'Book not available for loan' });
    }

    // Create the loan
    const loan = await Loan.create({ userId, bookId, dateRetour: new Date(new Date().setDate(new Date().getDate() + 14)) });

    // Update the book's availability status
    await book.update({ disponible: false });

    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};*/
exports.getAllLoans = async (req, res) => {
    try {
      const loans = await Loan.findAll({
        include: [
          { model: User, as: 'User' },
          { model: Book, as: 'Book' }
        ]
      });
      res.status(200).json(loans);
    } catch (error) {
      console.error('Error fetching loans:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.json(loan);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'emprunt', error);
    res.status(500).json({
      message: 'Error fetching loan',
      error: error.message
    });
  }
};

exports.updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    await loan.update(req.body);
    res.json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    await loan.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// controllers/loanController.js

// Return a loan
// controllers/loanController.js

// Return a loan
exports.returnLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const loan = await Loan.findByPk(loanId);

    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    // Update book availability
    const book = await Book.findByPk(loan.idLivre);
    book.disponible = true;
    await book.save();

    // Delete the loan record
    await loan.destroy();

    res.status(200).json({ message: 'Book returned and loan deleted successfully' });
  } catch (error) {
    console.error('Error returning loan:', error);
    res.status(500).json({ error: 'Error returning loan' });
  }
};
