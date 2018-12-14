import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Shelf from './Shelf'
import * as BooksAPI from './utils/BooksAPI'
import PropTypes from 'prop-types'
import {DebounceInput} from 'react-debounce-input'

class BookSearch extends Component {
  static propTypes = {
      shelves: PropTypes.array.isRequired,
      onShelfChange: PropTypes.func.isRequired
  }

  state = {
    searchResults: [],
  }

  handleShelfChange = (bookChanged, shelfId) => {
    const {searchResults} = this.state

    // update in our local searchResults
    searchResults.forEach(book => {
      if (book.id === bookChanged.id) {
        book.shelf = shelfId
      }
    })

    this.setState({searchResults})

    // notify the parent to change state
    this.props.onShelfChange(bookChanged, shelfId)
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
    const {searchResults} = this.state

    return (
      <div>
        <div className='search-form'>
          <Link
            className='back-button'
            to='/'>
            Back
          </Link>
          <DebounceInput
            className='search-input'
            type='text'
            name='query'
            minLength={2}
            debounceTimeout={300}
            placeholder='Search by Title or Author'
            onChange={this.handleSearchChange}
          />
        </div>
        <Shelf
          books={searchResults}
          onShelfChange={this.handleShelfChange}
        />
      </div>
    )
  }
}

export default BookSearch
