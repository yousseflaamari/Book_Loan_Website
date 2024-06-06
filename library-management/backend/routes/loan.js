const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.post('/', loanController.createLoan);
router.get('/', loanController.getAllLoans);
router.get('/:id', loanController.getLoanById);
router.put('/:id', loanController.updateLoan);
router.delete('/:id', loanController.deleteLoan);
// routes/loanRoutes.js

router.post('/return/:loanId', loanController.returnLoan);


module.exports = router;
