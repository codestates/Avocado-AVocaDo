<<<<<<< HEAD
/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import WordAccordion from './WordAccordion';
import WordCard from './WordCard';
=======
import React from 'react';
import PropTypes from 'prop-types';
import WordAccordion from './WordAccordion';
>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
import Pagination from './Pagination';
import { paginate } from '../utils/paginate';
import '../CSS/Wordbook.css';
import { Accordion, Card, Button } from 'react-bootstrap';

class WordList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
=======
      wordData: this.props.wordData,
>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
      pageSize: 5,
      currentPage: 1,
    };
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const {
<<<<<<< HEAD
      userInfo,
      handleLogout,
      wordData,
=======
      wordData,
      postInputWord,
>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
      updateWordData,
      deleteWordData,
      handleSentenceData,
      handleWordCardLength,
<<<<<<< HEAD
      word,
      isLogin,
      currentWord,
      addSentences,
    } = this.props;
    console.log('WordList', wordData);
    const count = Object.keys(wordData).length;
    const { pageSize, currentPage } = this.state;

    const words = paginate(wordData, currentPage, pageSize);
=======
    } = this.props;
    const { length: count } = wordData;
    const { pageSize, currentPage, wordData: allData } = this.state;

    const words = paginate(allData, currentPage, pageSize);

>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
    // pagenation 이후에도 모달창을 사용할 수 있도록 index 를 조정하였음
    // const indexCoefficient = (currentPage - 1) * pageSize;
    return (
      <React.Fragment>
        <div className="wordlist_wrap">
          <div className="wordlist_stack">
<<<<<<< HEAD
            {
              /*     words
                    ? words.map((word, index) => {
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
                    : 'noWord!' */
              words
                ? words.map((word, index) => {
                  let wordValue;
                  let wordKey = Object.keys(word.word)[0];
                  for (let i in word.word) {
                    wordValue = word.word[i];
                  }
                  return (
                    <WordAccordion
                      defaultActiveKey="0"
                      key={index}
                      word={wordValue}
                      sentences={word.sentences}>
                    </WordAccordion>
                  );
                })
                : 'noWord!'
            }
=======
            {words
              ? words.map((word, index) => {
                return (
                  <WordAccordion
                    defaultActiveKey="0"
                    key={index}
                    word={word.word}
                    sentences={word.sentences}>
                  </WordAccordion>
                );
              })
              : 'noWord!'}
>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
          </div>
        </div>
        <Pagination
          pageSize={pageSize}
          itemsCount={count}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

<<<<<<< HEAD
// WordList.propTypes = {
//   addWordData: PropTypes.func.isRequired,
//   handleInput: PropTypes.func.isRequired,
//   handleSentenceData: PropTypes.func.isRequired,
//   wordData: PropTypes.object.isRequired,
//   postInputWord: PropTypes.func.isRequired,
//   updateWordData: PropTypes.func.isRequired,
//   deleteWordData: PropTypes.func.isRequired,
//   handleWordCardLength: PropTypes.func.isRequired,
// };
=======
WordList.propTypes = {
  addWordData: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSentenceData: PropTypes.func.isRequired,
  wordData: PropTypes.object.isRequired,
  postInputWord: PropTypes.func.isRequired,
  updateWordData: PropTypes.func.isRequired,
  deleteWordData: PropTypes.func.isRequired,
  handleWordCardLength: PropTypes.func.isRequired,
};
>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d

export default WordList;
