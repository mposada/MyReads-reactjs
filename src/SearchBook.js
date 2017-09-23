import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./utils/BooksAPI";
import Book from "./Book";
import Loading from "./Loading";

class SearchBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: "",
            booksResult: [],
            isLoading: false
        };
    }

    _searchBooks(searchValue) {
        this.setState({ searchValue: searchValue.trim(), isLoading: true });
        if (searchValue.length > 0) {
            BooksAPI.search(searchValue)
                .then(response => {
                    // if response contains error
                    if (response.error != null) {
                        this.setState({
                            booksResult: [],
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            booksResult: response,
                            isLoading: false
                        });
                    }
                })
                .catch(error => console.log(`Error: ${error.message}`));
        } else {
            this.setState({ booksResult: [], isLoading: false });
        }
    }

    render() {
        let books = this.state.booksResult.map(book => {
            const findBook = this.props.books.find(item => item.id === book.id);

            if (findBook !== undefined) {
                book = findBook;
            }

            return (
                <Book
                    key={book.id}
                    book={book}
                    onUpdateBook={this.props.onUpdateBook}
                />
            );
        });
        return (
            <div className="search-books">
                {this.state.isLoading && <Loading />}
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                            */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.searchValue}
                            onChange={event =>
                                this._searchBooks(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">{books}</ol>
                </div>
            </div>
        );
    }
}

export default SearchBook;
