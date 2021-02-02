//helper function
function borrowedBooks(books) {
  return books.filter(
    (book) => !book.borrows.every((borrow) => borrow.returned)
  );
}
//helper function
function returnedBooks(books) {
  return books.filter((book) =>
    book.borrows.every((borrow) => borrow.returned)
  );
}

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  return [borrowedBooks(books), returnedBooks(books)];
}

function getBorrowersForBook(book, accounts) {
  const borrowersForBook = book.borrows.map((borrow) => {
    const account = accounts.find((account) => account.id === borrow.id);
    const returned = borrow.returned;
    return { ...account, returned };
  });
  return borrowersForBook.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
