const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Book = require('./book');

const Loan = sequelize.define('Loan', {
  dateEmprunt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dateRetour: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

User.hasMany(Loan, { foreignKey: 'idUtilisateur' });
Book.hasMany(Loan, { foreignKey: 'idLivre' });
Loan.belongsTo(User, { foreignKey: 'idUtilisateur' });
Loan.belongsTo(Book, { foreignKey: 'idLivre' });

module.exports = Loan;
