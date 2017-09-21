import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./utils/BooksAPI";
import "./App.css";
import SearchBook from "./SearchBook";
import BookList from "./BookList";

class BooksApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            isLoading: false
        };
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => this.setState({ books }));
    }

    _updateBookShelp(book, shelf) {
        this.setState({ isLoading: true });

        BooksAPI.update(book, shelf).then(response => {
            console.log(response.currentlyReading);

            const books = this.state.books.filter(item => {
                if (item.id === book.id) {
                    console.log(item.title);
                    console.log(item.shelf + " => " + shelf);
                    item.shelf = shelf;
                }

                return book;
            });

            this.setState({ books, isLoading: false });
        });
    }

    render() {
        return (
            <div className="app">
                {this.state.isLoading && (
                    <div className="list-books-loader">
                        <div className="loader" />
                    </div>
                )}

                <Route
                    exact
                    path="/"
                    render={() => (
                        <BookList
                            onUpdateBook={this._updateBookShelp.bind(this)}
                            books={this.state.books}
                        />
                    )}
                />
                <Route path="/search" component={SearchBook} />
            </div>
        );
    }
}

export default BooksApp;
