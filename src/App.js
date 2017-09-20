import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBook from "./SearchBook";
import BookList from "./BookList";

class BooksApp extends React.Component {
    render() {
        return (
            <div className="app">
                <Route exact path="/" component={BookList} />
                <Route path="/search" component={SearchBook} />
            </div>
        );
    }
}

export default BooksApp;
