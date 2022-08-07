const booklist = [
    {
        bookId: 1,
        image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
        name: "The art ",
        author: "Knuth"
    },
    {
        bookId: 2,
        image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
        name: "The art ",
        author: "Knuth"
    },
    {
        bookId: 3,
        image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
        name: "The art ",
        author: "Knuth"
    },
    {
        bookId: 4,
        image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
        name: "The art ",
        author: "Knuth"
    },
    {
        bookId: 5,
        image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
        name: "The art ",
        author: "Knuth"
    },
    {
        bookId: 6,
        image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
        name: "The art ",
        author: "Knuth"
    },
    {
        bookId: 7,
        image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
        name: "The art ",
        author: "Knuth"
    },
    {
        bookId: 8,
        image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
        name: "The art ",
        author: "Knuth"
    },
    {
        bookId: 9,
        image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
        name: "The art ",
        author: "Knuth"
    },
    {
        bookId: 10,
        image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
        name: "The art ",
        author: "Knuth"
    },
];

const getBookIds = ()=>{
    return booklist.map((book)=> book.id);
}

const getBookById = (id)=>{
    return booklist.filter((book)=> book.id === id)[0];
}

const bookService = {
    getBookIds,
    getBookById
}

export default bookService;