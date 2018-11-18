import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class BookSearch extends Component {
  render() {
    return (
      <div>
        <Link
          className='back-button'
          to='/'>
          Back
        </Link>
        <input type='text' name='query' placeholder='Search by Title or Author' />
      </div>
    )
  }
}

export default BookSearch
