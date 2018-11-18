import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import Shelves from './Shelves'
import BookSearch from './BookSearch'

class App extends Component {
  state = {
    shelves: []
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

  render() {
    const {shelves} = this.state

    return (
      <div className='App'>
        <Route exact path='/' render={() => (
          <Shelves
            shelves={shelves}
            onShelfChange={this.handleShelfChange}
          />
        )} />
        <Route path='/search' render={({history}) => (
          <BookSearch />
        )} />
      </div>
    )
  }
}

export default App
