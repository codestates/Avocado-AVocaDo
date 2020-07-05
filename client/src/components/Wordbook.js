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
      postInputWord,
      updateWordData,
      deleteWordData,
    } = this.props;

    return (
      <div>
        <div className="wordbook_header_wrap">
          <Wordbook_Header userInfo={userInfo} handleLogout={handleLogout} />
        </div>
        <div>
          <WordList
            wordData={wordData}
            postInputWord={postInputWord}
            updateWordData={updateWordData}
            deleteWordData={deleteWordData}
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
};

export default Wordbook;
