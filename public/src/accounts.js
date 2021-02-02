let homeFunctions = require("./home");

//helper function
function borrowedBooks(books) {
  return books.filter(
    (book) => !book.borrows.every((borrow) => borrow.returned)
  );
}

//helper function
function allBorrowsArray(books) {
  const allBorrows = books.reduce((total, book) => {
    total.push(...book.borrows);
    return total;
  }, []);
  return allBorrows;
}

function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  const accountsByLast = accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
  return accountsByLast;
}

function numberOfBorrows({ id }, books) {
  const allBorrows = allBorrowsArray(books);
  const counter = allBorrows.filter((borrow) => borrow.id === id);
  return counter.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  const allBorrowedBooks = borrowedBooks(books);
  const borrowedByAccount = allBorrowedBooks.filter(
    (borrowedBook) => borrowedBook.borrows[0].id === account.id
  );
  const borrowedWithAuthor = borrowedByAccount.map((book) => {
    const authorObject = authors.find((author) => author.id === book.authorId);
    book["author"] = authorObject;
    return;
    book;
  });
  //return borrowedWithAuthor;
  return borrowedByAccount;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
