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
//helper function
function getAuthorsBooks(author, books) {
  return books.filter((book) => book.authorId === author.id);
}

function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  return borrowedBooks(books).length;
}

function getMostCommonGenres(books) {
  let count = 0;
  const genres = books.reduce((total, book) => {
    total[book.genre] ? (count = total[book.genre].count + 1) : (count = 1);
    total[book.genre] = { name: book.genre, count };
    return total;
  }, []);
  const reMappedGenres = Object.values(genres);
  const topGenres = reMappedGenres.sort(
    (genreA, genreB) => genreB.count - genreA.count
  );
  return topGenres.slice(0, 5);
}

function getMostPopularBooks(books) {
  let sortedByPop = books.sort(
    (bookA, bookB) => bookB.borrows.length - bookA.borrows.length
  );
  return sortedByPop
    .map((book) => {
      const name = book.title;
      const count = book.borrows.length;
      return { name, count };
    })
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorCounts = authors.map((author) => {
    const name = `${author.name.first} ${author.name.last}`;
    const authorsBooks = getAuthorsBooks(author, books);
    const count = authorsBooks.reduce((total, book) => {
      total += book.borrows.length;
      return total;
    }, 0);
    return { name, count };
  });
  return authorCounts
    .sort((authorA, authorB) => authorB.count - authorA.count)
    .slice(0, 5);
}

module.exports = {
  borrowedBooks,
  returnedBooks,
  getAuthorsBooks,
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
