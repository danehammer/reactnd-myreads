import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import Shelf from './Shelf'
import BookSearch from './BookSearch'

class App extends Component {
  state = {
    searchResults: [],
    shelves: [
      {
        id: 'currentlyReading',
        name: 'Currently Reading',
        books: []
      },
      {
        id: 'wantToRead',
        name: 'Want to Read',
        books: []
      },
      {
        id: 'read',
        name: 'Read',
        books: []
      }
    ]
  }

  updateBooks() {
    const {shelves} = this.state

    BooksAPI.getAll().then(books => {
      shelves.map(shelf => {
        shelf.books = books.filter(book => book.shelf === shelf.id)
      })
      this.setState({shelves})
    })
  }

  componentDidMount() {
    this.updateBooks()
  }

  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(this.updateBooks())
  }

  handleSearchChange = (e) => {
    e.preventDefault()

    const {shelves} = this.state

    BooksAPI.search(e.target.value).then((books) => {
      // search API is buggy and returns `{"books": {"error": ...}}
      // breaking the data structure
      const searchResults = books instanceof Array ? books : []

      searchResults.map(searchBook => {
        let searchShelf
        shelves.map(shelf => {
          shelf.books.map(book => {
            if (book.id === searchBook.id) {
              searchShelf = shelf.id
            }
          })
        })
        searchBook.shelf = searchShelf
      })

      this.setState({searchResults})
    })
  }

  render() {
    const {shelves, searchResults} = this.state

    return (
      <div className='App'>
        <Route exact path='/' render={() => (
          <div>
            <header className='App-header'>¡Libros Míos!</header>
            {
              shelves.map(shelf => (
                <div className='shelf' key={shelf.id}>
                  <h2>{shelf.name}</h2>
                  <Shelf
                    books={shelf.books}
                    onShelfChange={this.handleShelfChange}
                  />
                </div>
              ))
            }
            <Link
              to='/search'
              className='add-button'
            >Add Book</Link>
          </div>
        )} />
        <Route path='/search' render={() => (
          <BookSearch
            searchResults={searchResults}
            onSearchChange={this.handleSearchChange}
            onShelfChange={this.handleShelfChange}
          />
        )} />
      </div>
    )
  }
}

export default App
