import React, { Component } from "react";
import Book from "./Book";

class BookSection extends Component {
    render() {
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.name}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {this.props.books.map(book => (
                                <Book key={book.id} book={book} />
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookSection;
