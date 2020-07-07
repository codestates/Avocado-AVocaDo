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
      handleWordCardLength,
    } = this.props;
    console.log('확인!2', this.props);
    console.log('handleSentenseData', handleSentenceData);

    // option 1) 최신순 6개 렌더링 
    const recenteData = wordData.slice(-6, wordData.length);

    // option 2) 10일 이내 전부 렌더링
    // function filterByDate() {
    //   const now = new Date();
    //   wordData.filter(word => {
    //     const createdAt = new Date(word.createdAt);
    //     createdAt.setDate(createdAt.getData() + 10)
    //     // createdAt.setHours(0)
    //     return createAt > now
    //   })
    // }
    // filterByDate.map(word => <WordCard ... />)

    return (
      <div className="wordcardstack_wrap" >
        <div className="wordcardstack_notice_area">
          최근 등록된 단어만 표시됩니다.
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
