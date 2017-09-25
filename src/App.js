import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./utils/BooksAPI";
import "./App.css";
import SearchBook from "./SearchBook";
import BookList from "./BookList";
import Loading from "./Loading";

class BooksApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            isLoading: false
        };
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({ books });
        });
    }

    _updateBookShelf(book, shelf) {
        this.setState({ isLoading: true });

        BooksAPI.update(book, shelf).then(response => {
            // check if the book exists in the current state
            const bookExists = this.state.books.find(
                item => item.id === book.id
            );
            // if exists lets add the new shelf if not concat to the current state
            if (bookExists !== undefined) {
                const books = this.state.books.filter(item => {
                    if (item.id === book.id) {
                        item.shelf = shelf;

                        if (shelf === "none") {
                            return false;
                        }
                    }

                    return true;
                });

                this.setState({ books, isLoading: false });
            } else {
                book.shelf = shelf;
                this.setState({
                    books: this.state.books.concat(book),
                    isLoading: false
                });
            }
        });
    }

    render() {
        return (
            <div className="app">
                {this.state.isLoading && <Loading />}

                <Route
                    exact
                    path="/"
                    render={() => (
                        <BookList
                            books={this.state.books}
                            onUpdateBook={this._updateBookShelf.bind(this)}
                        />
                    )}
                />
                <Route
                    path="/search"
                    render={() => (
                        <SearchBook
                            books={this.state.books}
                            onUpdateBook={this._updateBookShelf.bind(this)}
                        />
                    )}
                />
            </div>
        );
    }
}

export default BooksApp;
