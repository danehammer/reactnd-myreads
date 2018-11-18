import React, {Component} from 'react';

class Book extends Component {
  render() {
    const {book, onShelfControl} = this.props

    return (
      <div className="book">
        <div
          className="thumbnail"
          style={{
            backgroundImage: `url(${book.imageLinks.thumbnail})`
          }}
        >
          <button
            className="shelf-control"
            onClick={() => onShelfControl(book.id, book.shelf)}
          >
            Shelf...
          </button>
        </div>
        <div className="title">{book.title}</div>
        <div className="author">{book.authors[0]}</div>
      </div>
    )
  }
}

export default Book
