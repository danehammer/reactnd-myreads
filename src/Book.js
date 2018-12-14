import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  handleSelectChange = (e) => {
    e.preventDefault()
    const {book, onShelfChange} = this.props
    onShelfChange(book, e.target.value)
  }

  render() {
    const {book} = this.props

    return (
      <div className='book'>
        <div
          className='thumbnail'
          style={book.imageLinks && {
            backgroundImage: `url(${book.imageLinks.thumbnail})`
          }}>
          <div className='shelf-select'>
            <select value={book.shelf || 'none'} onChange={this.handleSelectChange}>
              <option disabled>Move to...</option>
              <option value='currentlyReading'>Currently Reading</option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Read</option>
              <option value='none'>None</option>
            </select>
          </div>
        </div>
        <div className='title'>{book.title}</div>
        {
          book.authors &&
          book.authors.map(author => (
            <div className='author' key={`${book.id}-${author}`}>{author}</div>
          ))
        }
      </div>
    )
  }
}

export default Book
