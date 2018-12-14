import React, {Component} from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import Shelf from './Shelf'
import BookSearch from './BookSearch'

class App extends Component {
  state = {
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

  componentDidMount() {
    const {shelves} = this.state

    BooksAPI.getAll().then(books => {
      shelves.forEach(shelf => {
        shelf.books = books.filter(book => book.shelf === shelf.id)
      })
      this.setState({shelves})
    })
  }

  findShelf(shelves, shelfId) {
    let foundShelf = null
    shelves.forEach(shelf => {
      if (shelf.id === shelfId) {
        foundShelf = shelf
      }
    })
    return foundShelf
  }

  handleShelfChange = (book, newShelfId) => {
    const {shelves} = this.state

    BooksAPI.update(book, newShelfId).then((bookIdsByShelfId) => {
      // Add the book that's changing shelves to the target shelf
      const newShelf = this.findShelf(shelves, newShelfId)
      if (newShelf) {
        book.shelf = newShelf.id
        newShelf.books.push(book)
      }
      // update responds with a map of shelf IDs to arrays of book IDs
      // reflecting the update
      Object.entries(bookIdsByShelfId).map(([shelfId, bookIds]) => {
          const shelf = this.findShelf(shelves, shelfId)
          shelf.books = shelf.books.filter(book => bookIds.includes(book.id))
      })

      this.setState({shelves})
    })
  }

  render() {
    const {shelves} = this.state

    return (
      <div className='App'>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => (
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
                to={`${process.env.PUBLIC_URL}/search`}
                className='add-button'
              >Add Book</Link>
            </div>
          )} />
          <Route path={`${process.env.PUBLIC_URL}/search`} render={() => (
            <BookSearch
              shelves={shelves}
              onShelfChange={this.handleShelfChange}
            />
          )} />
          <Route render={() => (
            <div>
              <h3>Sorry, that page doesn't exist.</h3>
              <Link to={`${process.env.PUBLIC_URL}/`}>Click here to go to the main page</Link>
            </div>
          )} />
        </Switch>
      </div>
    )
  }
}

export default App
