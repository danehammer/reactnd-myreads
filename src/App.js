import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import Shelves from './Shelves'
import BookSearch from './BookSearch'

class App extends Component {
  state = {
    shelves: [],
    searchResults: []
  }

  updateShelves = () => {
    BooksAPI.getAll().then((books) => {
      const currentBooks = books.filter(book => book.shelf === 'currentlyReading')
      const wantToBooks = books.filter(book => book.shelf === 'wantToRead')
      const readBooks = books.filter(book => book.shelf === 'read')

      this.setState({
        shelves: [
          {
            name: 'Currently Reading',
            id: 'currentlyReading',
            books: currentBooks
          },
          {
            name: 'Want to Read',
            id: 'wantToRead',
            books: wantToBooks
          },
          {
            name: 'Read',
            id: 'read',
            books: readBooks
          }
        ]
      })
    })
  }

  componentDidMount() {
    this.updateShelves()
  }

  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(this.updateShelves())
  }

  handleSearchChange = (e) => {
    e.preventDefault()
    BooksAPI.search(e.target.value).then((books) => {
      // search API is buggy and returns `{"books": {"error": ...}}
      // breaking the data structure
      const searchResults = books instanceof Array ? books : []
      this.setState({searchResults})
    })
  }

  render() {
    const {shelves, searchResults} = this.state

    return (
      <div className='App'>
        <Route exact path='/' render={() => (
          <Shelves
            shelves={shelves}
            onShelfChange={this.handleShelfChange}
          />
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
