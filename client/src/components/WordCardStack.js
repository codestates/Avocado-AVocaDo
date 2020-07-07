/* eslint-disable */
import React from 'react';
import WordCard from './WordCard';
import '../CSS/Main.css';

class WordCardStack extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      addWordData,
      wordData,
      postInputWord,
      updateWordData,
      deleteWordData,
      handleInput,
      handleSentenceData,
      addSentences,
    } = this.props;
    return (
      <div className="wordcardstack_wrap">
        <div className="wordcard_stack">
          {wordData
            ? wordData.map((word, index) => {
                let wordValue;
                let wordKey = Object.keys(word.word)[0];
                for (let i in word.word) {
                  wordValue = word.word[i];
                }

                return (
                  <WordCard
                    key={wordKey}
                    word={wordValue}
                    sentences={word.sentences}
                    index={wordKey}
                    postInputWord={postInputWord}
                    updateWordData={updateWordData}
                    deleteWordData={deleteWordData}
                    handleInput={handleInput}
                    handleSentenceData={handleSentenceData}
                    addSentences={addSentences}
                  />
                );
              })
            : 'noWord!'}
        </div>
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
