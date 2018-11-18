import React, {Component} from 'react';

class Book extends Component {
  handleSelectChange = (e) => {
    e.preventDefault()
    const {book, onShelfChange} = this.props
    onShelfChange(book, e.target.value)
  }

  render() {
    const {book} = this.props

    return (
      <div className="book">
        <div
          className="thumbnail"
          style={{
            backgroundImage: `url(${book.imageLinks.thumbnail})`
          }} />
        <div>
          <select value={book.shelf} onChange={this.handleSelectChange}>
            <option enabled="false" value="0">Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
        <div className="title">{book.title}</div>
        <div className="author">{book.authors[0]}</div>
      </div>
    )
  }
}

export default Book
