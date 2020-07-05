import React from 'react';
import WordCard from './WordCard';
import PropTypes from 'prop-types';
import '../CSS/Wordbook.css';

// pagination을 위해 함수 컴포넌트로 변경
function WordList({
  wordData,
  postInputWord,
  updateWordData,
  deleteWordData,
  handleSentenceData,
}) {
  return (
    <div className="wordlist_wrap">
      <div className="wordlist_stack">
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
    </div>
  );
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
