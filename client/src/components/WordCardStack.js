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
    console.log(this.props);
    const {
      addWordData,
      wordData,
      postInputWord,
      updateWordData,
      deleteWordData,
      handleInput,
      handleSentenceData,
    } = this.props;
    console.log('확인!2', this.props);
    console.log('handleSentenseData', handleSentenceData);

    const recenteData = wordData.slice(-6, wordData.length);

    return (
      <div className="wordcardstack_wrap" >
        <div className="wordcardstack_notice_area">
          <h3>최근 등록된 단어만 표시됩니다.</h3>
        </div>
        <div className="wordcardstack_area">
          {wordData
            ? recenteData.map((word, index) => {
              return (
                <WordCard
                  key={index}
                  word={word.word}
                  sentences={word.sentences}
                  index={index}
                  postInputWord={postInputWord}
                  updateWordData={updateWordData}
                  deleteWordData={deleteWordData}
                  addWordData={addWordData}
                  handleInput={handleInput}
                  handleSentenceData={handleSentenceData}
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
