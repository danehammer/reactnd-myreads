import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BooksAPI from './BooksAPI';

class App extends Component {
  state = {
    shelves: [{
      name: 'currentlyReading',
      books: [
        'book1',
        'book2'
      ]
    }]
  }

  componentDidMount() {
  }

  render() {
    const {shelves} = this.state;
    return (
      <div className="App">
        <header className="App-header">MyReads</header>
        {shelves.map(shelf => (
          <div className="shelf">
            <h2>{shelf.name}</h2>
            {shelf.books.map(bookName => (
              <div><span>{bookName}</span></div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
