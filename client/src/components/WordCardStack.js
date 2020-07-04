/* eslint-disable */
import React from 'react';
import WordCard from './WordCard';
import PropTypes from 'prop-types';
import '../CSS/Main.css';

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
      addWordData,
      handleInput,
      handleSentenseData,
    } = this.props;

    return (
      <div>
        {wordData
          ? wordData.map((word, index) => {
              return (
                <WordCard
                  word={word.word}
                  sentences={word.sentences}
                  index={index}
                  postInputWord={postInputWord}
                  updateWordData={updateWordData}
                  deleteWordData={deleteWordData}
                  addWordData={addWordData}
                  handleInput={handleInput}
                  handleSentenseData={handleSentenseData}
                />
              );
            })
          : 'noWord!'}
      </div>
    );
  }
}

// WordCardStack.propTypes = {
//   wordData: PropTypes.object.isRequired,
//   postInputWord: PropTypes.func.isRequired,
//   updateWordData: PropTypes.func.isRequired,
//   deleteWordData: PropTypes.func.isRequired,
// };

export default WordCardStack;
