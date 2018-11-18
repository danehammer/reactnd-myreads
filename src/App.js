import React, {Component} from 'react'
import * as BooksAPI from './utils/BooksAPI'
import Shelf from './Shelf'

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
      <div className="App">
        <header className="App-header">¡Libros Míos!</header>
        {shelves.map(shelf => (
          <Shelf
            shelf={shelf}
            key={shelf.id}
            onShelfChange={this.handleShelfChange}
          />
        ))}
      </div>
    )
  }
}

export default App
