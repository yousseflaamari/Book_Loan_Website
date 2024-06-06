const  Book  = require('../models/book');

exports.createBook = async (req, res) => {
  try {
    const { titre, auteur, anneePublication, genre, resume, disponible } = req.body;
    const newBook = await Book.create({ titre, auteur, anneePublication, genre, resume, disponible });
    res.status(201).json({
      message: 'Book created successfully',
      book: newBook
    });
  } catch (error) {
    console.error('Erreur lors de la création du livre', error);
    res.status(500).json({
      message: 'Error creating book',
      error: error.message
    });
  }
};










exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await book.update(req.body);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await book.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
