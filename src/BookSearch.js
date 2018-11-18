import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Shelf from './Shelf'

class BookSearch extends Component {

  render() {
    const {onSearchChange, searchResults, onShelfChange} = this.props

    return (
      <div>
        <div className='search-form'>
          <Link
            className='back-button'
            to='/'>
            Back
          </Link>
          <input
            className='search-input'
            type='text'
            name='query'
            placeholder='Search by Title or Author'
            onChange={onSearchChange}
          />
        </div>
        <Shelf books={searchResults} onShelfChange={onShelfChange} />
      </div>
    )
  }
}

export default BookSearch
