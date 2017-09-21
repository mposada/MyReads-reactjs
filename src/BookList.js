import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookSection from "./BookSection";

class BookList extends Component {
    render() {
        const booksShelf = this.props.books
            .map(book =>
                book.shelf
                    .split(/(?=[A-Z])/)
                    .map(word => word[0].toUpperCase() + word.slice(1))
                    .join(" ")
            )
            .filter(
                (shelf, index, inputArray) => inputArray.indexOf(shelf) == index
            );

        const bookShelfKey = this.props.books
            .map(book => book.shelf)
            .filter(
                (shelf, index, inputArray) => inputArray.indexOf(shelf) == index
            );

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                {this.props.books.length === 0 && (
                    <div className="list-books-loader">
                        <div className="loader" />
                    </div>
                )}

                <div className="list-books-content">
                    {booksShelf.map((shelf, index) => (
                        <BookSection
                            key={bookShelfKey[index]}
                            name={shelf}
                            books={this.props.books.filter(
                                book => book.shelf == bookShelfKey[index]
                            )}
                            onUpdateBook={this.props.onUpdateBook}
                        />
                    ))}
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}

export default BookList;
