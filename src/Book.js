import React, {Component} from 'react';

class Book extends Component {
  render() {
    return (
      <div>{this.props.book.title}</div>
    )
  }
}

export default Book
