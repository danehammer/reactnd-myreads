import React from 'react'
import Book from './Book'

function Shelf(props) {
  return (
    <div className="shelf">
      <h2>{props.shelf.name}</h2>
      <div className="book-list">
          {props.shelf.books.map(book => (
            <Book book={book} />
          ))}
      </div>
    </div>
  )
}

export default Shelf
