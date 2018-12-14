import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

function Shelf(props) {
  const {books, onShelfChange} = props
  return (
    <div className='book-list'>
      {books.map(book => (
        <Book
          book={book}
          key={book.id}
          onShelfChange={onShelfChange}
        />
      ))}
    </div>
  )
}

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default Shelf
