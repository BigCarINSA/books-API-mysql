const db = require('../domains/models/db');

async function getAllBooks() {
    const query = `SELECT * 
                  FROM book`;

    let result, fields;
    [result, fields] = await db.execute(query);
    return result;
}

async function getBookById(id) {
    const query = `SELECT * FROM book
                  WHERE ISBN = ?;`;

    let result, fields;
    [result, fields] = await db.execute(query, [id]);
    return result;
}

async function storeNewBook(body) {
    const query = `INSERT INTO book VALUES (?)`;
    const data = Object.values(body);

    let result, fields;
    [result, fields] = await db.query(query, [data]);
    return result;
}

function createUpdateInformation(body) {
    let setQuery = 'SET ';
    let data = [];
    for (const field in body) {
        if (body[field]) {
            setQuery += field + '= ?,';
            data.push(body[field]);
        }
    }
    return [setQuery.slice(0, -1), data];
}

async function updateById(id, body) {
    let setQuery, data;
    [setQuery, data] = createUpdateInformation(body);
    data.push(parseFloat(id));
    const query = `UPDATE book 
                    ${setQuery}
                    WHERE ISBN = ?;`;

    let result, fields;
    [result, fields] = await db.execute(query, data);
    return result;
}

async function updateOne(body) {
    const query = `REPLACE INTO book VALUES (?);`;
    const data = Object.values(body);

    let result, fields;
    [result, fields] = await db.query(query, [data]);
    return result;
}

async function buyBookById(id, quantity) {
    const [bookBuy] = await getBookById(id);
    if (bookBuy.Stock > quantity) {
        bookBuy.Stock -= quantity;
        return await updateById(id, bookBuy);
    } else {
        return false;
    }
}

async function deleteBookById(id) {
    const query = `DELETE FROM book 
                    WHERE ISBN = ? `;

    let result, fields;
    [result, fields] = await db.execute(query, [id]);
    return result;
}

module.exports = {
    getBookById,
    getAllBooks,
    storeNewBook,
    updateById,
    updateOne,
    buyBookById,
    deleteBookById,
};
