import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'

class App extends Component {
  state = {
    shelves: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const currentBooks = books.filter(book => book.shelf === 'currentlyReading')
      const wantToBooks = books.filter(book => book.shelf === 'wantToRead')
      const readBooks = books.filter(book => book.shelf === 'read')

      this.setState({
        shelves: [
          {
            name: 'Currently Reading',
            books: currentBooks
          },
          {
            name: 'Want to Read',
            books: wantToBooks
          },
          {
            name: 'Read',
            books: readBooks
          }
        ]
      })
    })
  }

  render() {
    const {shelves} = this.state
    return (
      <div className="App">
        <header className="App-header">MyReads</header>
        {shelves.map(shelf => (
          <Shelf shelf={shelf} />
        ))}
      </div>
    )
  }
}

export default App
