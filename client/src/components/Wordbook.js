<<<<<<< HEAD
/* eslint-disable */
=======
>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
import React from 'react';
import Wordbook_Header from './Wordbook_Header';
import WordList from './WordList';
import PropTypes from 'prop-types';
import '../CSS/Wordbook.css';

class Wordbook extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {

      userInfo,
      handleLogout,
      wordData,
<<<<<<< HEAD
=======
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

    console.log('Wordbook', wordData);
=======
    } = this.props;

>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
    return (
      <div>
        <div className="wordbook_header_wrap">
          <Wordbook_Header userInfo={userInfo} handleLogout={handleLogout} />
        </div>
        <div>
          <WordList
            wordData={wordData}
<<<<<<< HEAD
            word={word}
            isLogin={isLogin}
            currentWord={currentWord}
            addSentences={addSentences}
=======
            word={wordData.word}
            sentences={wordData.sentences}
            postInputWord={postInputWord}
>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
            updateWordData={updateWordData}
            deleteWordData={deleteWordData}
            handleSentenceData={handleSentenceData}
            handleWordCardLength={handleWordCardLength}
          />
        </div>
      </div>
    );
  }
}

<<<<<<< HEAD
// Wordbook.propTypes = {
//   userInfo: PropTypes.object.isRequired,
//   handleLogout: PropTypes.func.isRequired,
//   wordData: PropTypes.array.isRequired,
//   handleSentenceData: PropTypes.func.isRequired,
//   postInputWord: PropTypes.func.isRequired,
//   updateWordData: PropTypes.func.isRequired,
//   deleteWordData: PropTypes.func.isRequired,
//   handleWordCardLength: PropTypes.func.isRequired,
// };
=======
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
>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d

export default Wordbook;
