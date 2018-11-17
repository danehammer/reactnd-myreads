import React from 'react'

function Shelf(props) {
  return (
    <div className="shelf">
      <h2>{props.shelf.name}</h2>
      {props.shelf.books.map(book => (
        <div><span>{book.title}</span></div>
      ))}
    </div>
  )
}

export default Shelf
