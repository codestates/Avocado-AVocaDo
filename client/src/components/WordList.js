/* eslint-disable */
import React from 'react';
import PropTypes, { func } from 'prop-types';
import _ from 'lodash';
import WordAccordion from './WordAccordion';
import WordCard from './WordCard';
import Pagination from './Pagination';
import { paginate } from '../utils/paginate';
import '../CSS/Wordbook.css';
import { Accordion, Card, Button } from 'react-bootstrap';

class WordList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 5,
      currentPage: 1,
    };

    this.renderWordAccordion = this.renderWordAccordion.bind(this);
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  renderWordAccordion() {

    const {
      wordData,
      index,
      isSearch,
      searchText
    } = this.props;

    const { pageSize, currentPage } = this.state;
    const words = paginate(wordData, currentPage, pageSize);

    // TODO: 검색버튼을 누르면 isSearch = true 로 변경 

    /* wordData
    [
      0: {word: {3: "3"}, updatedAt: "Wed, 08 Jul 2020 05:46:37 GMT", sentences: {…}}
    1: {word: {5: "5"}, updatedAt: "Wed, 08 Jul 2020 05:46:37 GMT", sentences: {…}}
    ] */


    let result = _.map(wordData, function (wordObj) {

      let findResult = _.find(wordObj.word, function (word) {

        return word === searchText;
      })

      if (findResult) {
        return wordObj
      }
    });

    let searchResult = _.find(result, function (object) {

      return object !== undefined;
    })

    console.log(result);
    console.log('searchResult', isSearch, searchResult)

    if (searchResult) {
      var searchArr = [searchResult];
    }
    if (isSearch && searchArr) {

      // 여기서 
      // 검색결과를 map 으로 렌더링한 것을 리턴한다. 
      return searchArr.map((word, index) => {
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
            index={wordKey}
            sentences={word.sentences}>
          </WordAccordion>
        );
      });
    }

    else if (isSearch && !searchArr) {


      alert('검색결과가 단어장에 없습니다!')
      return words
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
            index={wordKey}
            sentences={word.sentences}>
          </WordAccordion>
        );
      })
      : 'noWord!'
      
    }

    else {
      return words
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
              index={wordKey}
              sentences={word.sentences}>
            </WordAccordion>
          );
        })
        : 'noWord!'
    }
  }


  render() {
    const {
      userInfo,
      handleLogout,
      wordData,
      updateWordData,
      deleteWordData,
      handleSentenceData,
      handleWordCardLength,
      word,
      isLogin,
      currentWord,
      addSentences,
    } = this.props;
    console.log('WordList', wordData);
    const count = Object.keys(wordData).length;
    const { pageSize, currentPage } = this.state;

    // TODO: 
    // pagenation 이후에도 모달창을 사용할 수 있도록 index 를 조정하였음
    // const indexCoefficient = (currentPage - 1) * pageSize;
    return (
      <React.Fragment>
        <div className="wordlist_wrap">
          <div className="wordlist_stack">
            {this.renderWordAccordion()}
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

export default WordList;
