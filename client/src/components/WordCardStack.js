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
      wordData,
      updateWordData,
      deleteWordData,
      handleSentenceData,
      addSentences,
    } = this.props;
    console.log('WordCardStack', this.props);

    // option 1) 최신순 6개 렌더링
    var recenteData;
    if (wordData) {
      recenteData = wordData.slice(-6, wordData.length);
    }
    console.log(recenteData);
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
      <div className="wordcardstack_wrap">
        <div className="wordcardstack_notice_area">
          최근 등록된 단어만 표시됩니다.
        </div>
        <div className="wordcardstack_area">
          {recenteData
            ? recenteData.map((word, index) => {
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
                    updateWordData={updateWordData}
                    deleteWordData={deleteWordData}
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
