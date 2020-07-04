import React, { Component } from 'react';
import Header_wordbook from './Header_wordbook';
import '../CSS/Wordbook.css';

class Wordbook extends Component {
  render() {
    return (
      <div>
        <div className="wordbook_header_wrap">
          <Header_wordbook />
        </div>
      </div>
    );
  }
}

export default Wordbook;
