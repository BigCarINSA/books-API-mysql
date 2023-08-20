const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');

router.post('/store', booksController.addBook);
router.get('/:id', booksController.getBookById);
router.put('/:id/update', booksController.updateById);
router.delete('/:id', booksController.deleteById);
router.post('/:id/buy', booksController.buyBookById);
router.get('/', booksController.getAllBooks);

module.exports = router;
