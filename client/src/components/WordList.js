import React from 'react';
import PropTypes from 'prop-types';
import WordCard from './WordCard';
import Pagination from './Pagination';
import { paginate } from '../utils/paginate';
import '../CSS/Wordbook.css';
import 'bootstrap/dist/css/bootstrap.css';

class WordList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO : 왜 app 에서 내려온 걸 그대로 쓰지 않고 state 를 다시 만들었을까?
      wordBookData: this.props.wordData,
      pageSize: 5,
      currentPage: 1,
    };
  }

  // 페이지를 변경하는 method
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const {
      wordData,
      postInputWord,
      updateWordData,
      deleteWordData,
      handleSentenceData,
    } = this.props;
    console.log('wordData', wordData);
    const { length: count } = wordData;
    // wordList 에 있는
    // 전체 page 를 5개로 나누겠다.
    const { pageSize, currentPage, wordBookData } = this.state;
    console.log('allData', wordBookData);

    // words => 5개 단위로 분리한 배열
    // 분리한 이유는 pagenation 을 위함
    // 전체 data 를 넘김
    // 전체 worddata, 현재page, 전체 page size
    const words = paginate(wordBookData, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="wordlist_wrap">
          <div className="wordlist_stack">
            {words
              ? words.map((word, index) => {
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
