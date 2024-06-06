const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const cors = require('cors');
const User = require('./models/user');
const Book = require('./models/book');
const Loan = require('./models/loan');

const port = 3001;
app.use(cors());
app.use(bodyParser.json());

// Import routes
// Import routes
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const loanRoutes = require('./routes/loan'); // à créer également

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes); // à créer également


app.get('/', (req, res) => {
  res.send('Welcome to Library Management API');
});

// Synchronize models
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });
