import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Shelf from './Shelf'
import * as BooksAPI from './utils/BooksAPI'

class BookSearch extends Component {
  state = {
    searchResults: [],
  }

  handleSearchChange = (e) => {
    e.preventDefault()

    const {shelves} = this.props
    const query = e.target.value

    if (query === '') {
      return
    }

    BooksAPI.search(query).then((books) => {
      // search API is buggy and returns `{"books": {"error": ...}}
      // breaking the data structure
      const searchResults = books instanceof Array ? books : []

      searchResults.forEach(searchBook => {
        let searchShelf
        shelves.forEach(shelf => {
          shelf.books.forEach(book => {
            if (book.id === searchBook.id) {
              searchShelf = shelf.id
            }
          })
        })
        searchBook.shelf = searchShelf
      })

      this.setState({searchResults})
    })
  }

  render() {
    const {onShelfChange} = this.props
    const {searchResults} = this.state

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
            onChange={this.handleSearchChange}
          />
        </div>
        <Shelf books={searchResults} onShelfChange={onShelfChange} />
      </div>
    )
  }
}

export default BookSearch
