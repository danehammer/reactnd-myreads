import React, {Component} from 'react';

class Book extends Component {
  render() {
    return (
      <div className="book">{this.props.book.title}</div>
    )
  }
}

export default Book
