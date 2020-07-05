import React from 'react';
import WordCard from './WordCard';
import PropTypes from 'prop-types';
import '../CSS/Wordbook.css';

class WordList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      wordData,
      postInputWord,
      updateWordData,
      deleteWordData,
      handleSentenceData,
    } = this.props;

    return (
      <div className="wordlist">
        {wordData
          ? wordData.map((word, index) => {
              return (
                <WordCard
                  key={index}
                  word={word.word}
                  sentences={word.sentences}
                  index={index}
                  postInputWord={postInputWord}
                  updateWordData={updateWordData}
                  deleteWordData={deleteWordData}
                  handleSentenceData={handleSentenceData}
                />
              );
            })
          : 'noWord!'}
      </div>
    );
  }
}

WordList.propTypes = {
  addWordData: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSentenceData: PropTypes.func.isRequired,
  wordData: PropTypes.object.isRequired,
  postInputWord: PropTypes.func.isRequired,
  updateWordData: PropTypes.func.isRequired,
  deleteWordData: PropTypes.func.isRequired,
};

export default WordList;
