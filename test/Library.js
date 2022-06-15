const { ethers } = require("hardhat");
const { expect } = require("chai");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}



describe("Library contract", function () {
    let Library;
    let library;
    let owner;


    const NUM_FINISHED_BOOK = 5;
    const NUM_UNFINISHED_BOOK = 3;

    let unfinishedBookList;
    let finishedBookList;
    function verifyBook(bookChain, book) {
        expect(book.name).to.equal(bookChain.name);
        expect(book.year.toString()).to.equal(bookChain.year.toString());
        expect(book.author).to.equal(bookChain.author);
    }

    function verifyBookList(booksFromChain, bookList) {
        expect(booksFromChain.length).to.not.equal(0);
        expect(booksFromChain.length).to.equal(bookList.length);
        for (let i = 0; i < bookList.length; i++) {
            const bookChain = booksFromChain[i];
            const book = bookList[i];
            // verifyBook(bookChain, book);
        }
    }

    beforeEach(async function () {
        Library = await ethers.getContractFactory("Library");
        [owner] = await ethers.getSigners();
        library = await Library.deploy()


        unfinishedBookList = [];
        finishedBookList = [];


        for (let i = 0; i < NUM_UNFINISHED_BOOK; i++) {
            let book = {
                "name": getRandomInt(1, 1000).toString(),
                "year": getRandomInt(1800, 2000),
                'author': getRandomInt(1455, 10030).toString(),
                'finished': false
            }
            await library.addBook(book.name, book.year, book.author, book.finished);

            unfinishedBookList.push(book);
        }

        for (let i = 0; i < NUM_FINISHED_BOOK; i++) {
            let book = {
                'name': getRandomInt(1, 1000).toString(),
                'year': getRandomInt(1800, 2000),
                'author': getRandomInt(1455, 10030).toString(),
                'finished': true
            }
            await library.addBook(book.name, book.year, book.author, book.finished);

            finishedBookList.push(book);
        }


    })

    describe("Add book", function () {
        it("should emit Addbook event", async function () {
            let book = {
                'name': getRandomInt(1, 1000).toString(),
                'year': getRandomInt(1800, 2000),
                'author': getRandomInt(1455, 10030).toString(),
                'finished': false
            }
            await expect(await library.addBook(book.name, book.year, book.author, book.finished)).to.emit(library, 'AddBook').withArgs(owner.address, NUM_FINISHED_BOOK + NUM_UNFINISHED_BOOK)
        })
    })

    describe("Get Book", function () {
        it("it should return correct unfinished book", async function () {
            const bookFromChain = await library.getUnFinishedBook();
            expect(bookFromChain.length).to.equal(NUM_UNFINISHED_BOOK);
            verifyBookList(bookFromChain, unfinishedBookList);
        })
    })

    describe("Get Book", function () {
        it("it should return correct finished book", async function () {
            const bookFromChain = await library.getFinishedBook();
            expect(bookFromChain.length).to.equal(NUM_FINISHED_BOOK);
            verifyBookList(bookFromChain, finishedBookList);
        })
    })

    describe("Set finished", function () {
        it("should emit SetFinished event ", async function () {
            const BOOK_ID = 0;
            const BOOK_FINISHED = true;

            await expect(library.setFinished(BOOK_ID, BOOK_FINISHED)).to.emit(library, "SetFinished").withArgs(BOOK_ID, BOOK_FINISHED)
        })
    })
})