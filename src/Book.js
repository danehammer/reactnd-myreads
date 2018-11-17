import React, {Component} from 'react';

class Book extends Component {
  render() {
    const {book} = this.props

    return (
      <div className="book">
        <div className="thumbnail">TODO</div>
        <div className="title">{book.title}</div>
        <div className="author">{book.authors[0]}</div>
      </div>
    )
  }
}

export default Book
