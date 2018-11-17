import React, {Component} from 'react'
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

  handleShelfControl = (bookId, shelfId) => {
    console.log(bookId, shelfId)
  }

  render() {
    const {shelves} = this.state
    return (
      <div className="App">
        <header className="App-header">¡Libros Mios!</header>
        {shelves.map(shelf => (
          <Shelf
            shelf={shelf}
            key={shelf.id}
            onShelfControl={this.handleShelfControl}
          />
        ))}
      </div>
    )
  }
}

export default App
