import React, { Component } from "react";

class Book extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shelf: ""
        };
    }

    componentDidMount() {
        // is this ok ?
        this.setState({
            shelf: this.props.book.shelf
        });
    }

    _changeBookShelf(event) {
        const shelf = event.target.value;
        const book = this.props.book;
        this.props.onUpdateBook(book, shelf);
    }

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
                    <div className="book-authors">
                        {this.props.book.authors[0]}
                    </div>
                </div>
            </li>
        );
    }
}

export default Book;
