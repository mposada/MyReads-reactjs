import React, { Component } from "react";

class Book extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shelf: "none"
        };
    }

    componentDidMount() {
        // is this ok ?
        if (this.props.book.shelf != null) {
            this.setState({
                shelf: this.props.book.shelf
            });
        }
    }

    _changeBookShelf(event) {
        const shelf = event.target.value;
        const book = this.props.book;
        this.props.onUpdateBook(book, shelf);
    }

    render() {
        let image;
        let backgroundImage;
        if (this.props.book.imageLinks != null) {
            image = this.props.book.imageLinks.thumbnail;
            backgroundImage = `url("${image}")`;
        } else {
            backgroundImage =
                'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")';
        }

        let author = "No Author";
        if (this.props.book.authors != null) {
            author = this.props.book.authors[0];
        }

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
                        <div className="book-shelf-changer">
                            <select
                                value={this.state.shelf}
                                onChange={this._changeBookShelf.bind(this)}
                            >
                                <option value="none" disabled>
                                    Move to...
                                </option>
                                <option value="currentlyReading">
                                    Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{author}</div>
                </div>
            </li>
        );
    }
}

export default Book;
