/* eslint-disable */
import React from 'react';
import WordCard from './WordCard';
import '../CSS/Main.css';

class WordCardStack extends React.Component {
  constructor(props) {
    super(props);
    console.log('wordCard!Stack', this.props);
  }

  render() {
    const {
      wordData,
      postInputWord,
      updateWordData,
      deleteWordData,
      handleInput,
      handleSentenceData,
    } = this.props;
    console.log('확인!2', this.props);
    console.log('handleSentenseData', handleSentenceData);
    return (
      <div className="wordcard_stack">
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
                  handleInput={handleInput}
                  handleSentenceData={handleSentenceData}
                />
              );
            })
          : 'noWord!'}
      </div>
    );
  }
}

// WordCardStack.propTypes = {
//   addWordData: PropTypes.func.isRequired,
//   handleInput: PropTypes.func.isRequired,
//   handleSentenceData: PropTypes.func.isRequired,
//   wordData: PropTypes.object.isRequired,
//   postInputWord: PropTypes.func.isRequired,
//   updateWordData: PropTypes.func.isRequired,
//   deleteWordData: PropTypes.func.isRequired,
// };

export default WordCardStack;
