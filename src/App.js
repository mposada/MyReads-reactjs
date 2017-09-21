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
            books: []
        };
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => this.setState({ books }));
    }

    render() {
        return (
            <div className="app">
                <Route
                    exact
                    path="/"
                    render={() => <BookList books={this.state.books} />}
                />
                <Route path="/search" component={SearchBook} />
            </div>
        );
    }
}

export default BooksApp;
