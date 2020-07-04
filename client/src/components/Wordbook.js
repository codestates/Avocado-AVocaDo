import React, { Component } from 'react';
import Wordbook_Header from './Wordbook_Header';
import WordList from './WordList';
import '../CSS/Wordbook.css';

class Wordbook extends Component {
  render() {
    console.log('wordbook', this.props);
    return (
      <div>
        <div className="wordbook_header_wrap">
          <Wordbook_Header />
        </div>
        <div>
          <WordList />
        </div>
      </div>
    );
  }
}

export default Wordbook;
