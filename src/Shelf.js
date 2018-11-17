import React from 'react'
import Book from './Book'

function Shelf(props) {
  return (
    <div className="shelf">
      <h2>{props.shelf.name}</h2>
      {props.shelf.books.map(book => (
        <Book book={book} />
      ))}
    </div>
  )
}

export default Shelf
