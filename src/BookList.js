import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookSection from "./BookSection";

class BookList extends Component {
    render() {
        const booksSections = this.props.books
            .map(book =>
                book.shelf
                    .split(/(?=[A-Z])/)
                    .map(word => word[0].toUpperCase() + word.slice(1))
                    .join(" ")
            )
            .filter(
                (shelf, index, inputArray) => inputArray.indexOf(shelf) == index
            );

        const booksSectionsKeys = this.props.books
            .map(book => book.shelf)
            .filter(
                (shelf, index, inputArray) => inputArray.indexOf(shelf) == index
            );

        console.log(booksSectionsKeys);

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {booksSections.map((section, index) => (
                        <BookSection
                            key={booksSectionsKeys[index]}
                            name={section}
                            books={this.props.books.filter(
                                book => book.shelf == booksSectionsKeys[index]
                            )}
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
