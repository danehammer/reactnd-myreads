import React from 'react'
import Book from './Book'

function Shelf(props) {
  return (
    <div className='book-list'>
      {props.books.map(book => (
        <Book
          book={book}
          key={book.id}
          onShelfChange={props.onShelfChange}
        />
      ))}
    </div>
  )
}

export default Shelf
