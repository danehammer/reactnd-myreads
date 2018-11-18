import React from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'

function Shelves(props) {
  return (
    <div>
      <header className="App-header">¡Libros Míos!</header>
      {
        props.shelves.map(shelf => (
          <div className="shelf" key={shelf.id}>
            <h2>{shelf.name}</h2>
            <div className="book-list">
              {shelf.books.map(book => (
                <Book
                  book={book}
                  key={book.id}
                  onShelfChange={props.onShelfChange}
                />
              ))}
            </div>
          </div>
        ))
      }
      <Link
        to='/search'
        className='add-button'
      >Add Contact</Link>
    </div>
  )
}

export default Shelves
