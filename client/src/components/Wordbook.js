import React, { Component } from 'react';
import Wordbook_Header from './Wordbook_Header';
import '../CSS/Wordbook.css';

class Wordbook extends Component {
  render() {
    return (
      <div>
        <div className="wordbook_header_wrap">
          <Wordbook_Header />
        </div>
      </div>
    );
  }
}

export default Wordbook;
