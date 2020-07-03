/* eslint-disable */
import React from 'react';

class WordCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { word, sentences, postInputWord } = this.props;
    // postInputWord, updateWordData, deleteWordData
    console.log('WordCard', this.props);
    return (
      <div className="word_card" style={{ cursor: 'pointer' }}>
        <div className="word">{word}</div>
        <ul className="sentences">
          {sentences.map((sentence, index) => {
            return <li key={index}>{sentence}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default WordCard;
