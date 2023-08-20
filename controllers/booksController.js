const book = require('../domains/models/book');
const booksServices = require('../services/booksServices');

class BookController {
    //show all books
    async getAllBooks(req, res, next) {
        try {
            const books = await booksServices.getAllBooks();
            if (books) {
                res.send(books);
            } else {
                res.send('No books found!');
            }
        } catch (err) {
            res.send(err.message);
        }
    }

    //show a book by its id
    async getBookById(req, res, next) {
        try {
            const bookToFind = await booksServices.getBookById(req.params.id);
            if (bookToFind) {
                res.send(bookToFind);
            } else {
                res.send('No book with id ' + req.params.id + ' found!');
            }
        } catch (err) {
            res.send(err.message);
        }
    }

    //store new book
    async addBook(req, res, next) {
        const books = await booksServices.getBookById(req.body.ISBN);
        if (books.length > 0) {
            return res.send('Book already exists!');
        }

        try {
            await booksServices.storeNewBook(req.body);
            res.send('Update book successfully!');
            //res.redirect('/');
        } catch (err) {
            res.send(err);
        }
    }

    //update a book
    async updateById(req, res, next) {
        try {
            const ressult = await booksServices.updateById(
                req.params.id,
                req.body
            );
            if (ressult.affectedRows === 1) {
                res.send('Edit book successfully!');
            } else {
                res.send('Book not existed');
            }
        } catch (err) {
            res.send(err);
        }
    }

    //delete a book
    async deleteById(req, res, next) {
        try {
            const ressult = await booksServices.deleteBookById(req.params.id);
            if (ressult.affectedRows === 1) {
                res.send('Book deleted successfully!');
                //counter.descCounter('book');
            } else {
                res.send('Book not existed');
            }
        } catch (err) {
            res.send(err);
        }
    }

    //buy a book
    async buyBookById(req, res, next) {
        try {
            const ressult = await booksServices.buyBookById(
                req.params.id,
                req.body.quantity
            );
            if (ressult.hasOwnProperty('affectedRows')) {
                if (ressult.affectedRows > 0) {
                    res.send('Book bought successfully!');
                } else {
                    res.send('Book bought failed!');
                }
            } else {
                res.send('Not enough quantities to buy!');
            }
        } catch (err) {
            res.send(err.message);
        }
    }
}

module.exports = new BookController();
