/* eslint-disable */
import React, { Component } from 'react';

class WordCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { wordData } = this.props;
    // postInputWord, updateWordData, deleteWordData
    return (
      <div className="word_card" style={{ cursor: 'pointer' }}>
        <div className="word">{wordData[0].word}</div>
        <ul className="sentences">
          {wordData[0].sentence.map((sentence, index) => {
            return <li>{sentence}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default WordCard;
