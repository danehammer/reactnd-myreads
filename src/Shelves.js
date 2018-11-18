import React from 'react'
import {Link} from 'react-router-dom'
import Shelf from './Shelf'

function Shelves(props) {
  return (
    <div>
      <header className='App-header'>¡Libros Míos!</header>
      {
        props.shelves.map(shelf => (
          <div className='shelf' key={shelf.id}>
            <h2>{shelf.name}</h2>
            <Shelf
              books={shelf.books}
              onShelfChange={props.onShelfChange}
            />
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
