import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WordCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { wordData } = this.props;
    // postInputWord, updateWordData, deleteWordData
    // 'postInputWord' is assigned a value but never used 에러로 주석처리 했습니다.

    return (
      <div className="word_card" style={{ cursor: 'pointer' }}>
        <div className="word">{wordData[0].word}</div>
        <ul className="sentences">
          {wordData[0].sentence.map((sentence, index) => {
            return <li key={index}>{sentence}</li>;
          })}
        </ul>
      </div>
    );
  }
}

WordCard.propTypes = {
  wordData: PropTypes.array.isRequired,
  'wordData[].word': PropTypes.string.isRequired,
  'wordData[].sentence': PropTypes.string.isRequired,
  'wordData[].sentence.map': PropTypes.string.isRequired,
};

export default WordCard;
