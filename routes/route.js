const indexRouter = require('./indexRouter');
const bookRouter = require('./bookRouter');

function route(app) {
    app.use('/api/books', bookRouter);
    app.use('/', indexRouter); //Home page
}

module.exports = route;
