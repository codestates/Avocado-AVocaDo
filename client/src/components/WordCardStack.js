/* eslint-disable */
import React, { Component } from 'react';
import WordCard from './WordCard';

class WordCardStack extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      wordData,
      postInputWord,
      updateWordData,
      deleteWordData,
    } = this.props;
    return (
      <div>
        {wordData.map((word, index) => {
          return (
            <WordCard
              word={word.word}
              sentence={word.sentence}
              index={index}
              postInputWord={postInputWord}
              updateWordData={updateWordData}
              deleteWordData={deleteWordData}
            />
          );
        })}
      </div>
    );
  }
}

export default WordCard;
