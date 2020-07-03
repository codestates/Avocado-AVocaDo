/* eslint-disable */
import React from 'react';
import WordCard from './WordCard';
import PropTypes from 'prop-types';

class WordCardStack extends React.Component {
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
    console.log('WordCardStack', wordData);
    return (
      <div>
        {wordData
          ? wordData.map((word, index) => {
              /*  word=> { word: 'apple',sentence: []} */
              return (
                <WordCard
                  word={word.word}
                  sentences={word.sentences}
                  key={index}
                  postInputWord={postInputWord}
                  updateWordData={updateWordData}
                  deleteWordData={deleteWordData}
                />
              );
            })
          : 'noWord!'}
      </div>
    );
  }
}

WordCardStack.propTypes = {
  wordData: PropTypes.object.isRequired,
  postInputWord: PropTypes.func.isRequired,
  updateWordData: PropTypes.func.isRequired,
  deleteWordData: PropTypes.func.isRequired,
};

export default WordCardStack;
