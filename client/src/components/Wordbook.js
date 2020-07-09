/* eslint-disable */

import React from 'react';
import Wordbook_Header from './Wordbook_Header';
import WordList from './WordList';
import PropTypes from 'prop-types';
import '../CSS/Wordbook.css';

class Wordbook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearch: false,
      searchText: '',
    };
  }

  handleSearch(queryText) {
    this.setState({ isSearch: true, searchText: queryText });
  }

  render() {
    const {
      userInfo,
      handleLogout,
      wordData,
      postInputWord,
      updateWordData,
      deleteWordData,
      handleSentenceData,
      handleWordCardLength,
      word,
      isLogin,
      currentWord,
      addSentences,
    } = this.props;

    const { isSearch, searchText } = this.state;
    return (
      <div>
        <div className="wordbook_header_wrap">
          <Wordbook_Header
            userInfo={userInfo}
            handleLogout={handleLogout}
            isSearch={isSearch}
            searchText={searchText}
            handleSearch={this.handleSearch.bind(this)}
          />
        </div>
        <div>
          <WordList
            wordData={wordData}
            word={word}
            isLogin={isLogin}
            currentWord={currentWord}
            addSentences={addSentences}
            word={wordData.word}
            sentences={wordData.sentences}
            postInputWord={postInputWord}
            updateWordData={updateWordData}
            deleteWordData={deleteWordData}
            handleSentenceData={handleSentenceData}
            handleWordCardLength={handleWordCardLength}
            isSearch={isSearch}
            searchText={searchText}
            handleSearch={this.handleSearch.bind(this)}
          />
        </div>
      </div>
    );
  }
}

Wordbook.propTypes = {
  userInfo: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  wordData: PropTypes.array.isRequired,
  handleSentenceData: PropTypes.func.isRequired,
  postInputWord: PropTypes.func.isRequired,
  updateWordData: PropTypes.func.isRequired,
  deleteWordData: PropTypes.func.isRequired,
  handleWordCardLength: PropTypes.func.isRequired,
};

export default Wordbook;
