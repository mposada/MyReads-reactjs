import React, { Component } from "react";
import BookshelfPicker from "./BookshelfPicker";

class Book extends Component {
    render() {
        const image = this.props.book.imageLinks.thumbnail;
        const backgroundImage = `url("${image}")`;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                                width: 128,
                                height: 193,
                                backgroundImage: backgroundImage
                            }}
                        />
                        <BookshelfPicker />
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">
                        {this.props.book.authors[0]}
                    </div>
                </div>
            </li>
        );
    }
}

export default Book;
