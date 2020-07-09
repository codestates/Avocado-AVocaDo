/* eslint-disable */
import React from 'react';

// import { Switch, Route, Redirect } from 'react-router-dom'; // userHistory

import Main_Header from './Main_Header';
import WordInput from './WordInput';
import WordCardStack from './WordCardStack';
class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getWordData();
  }
  render() {
    const {
      isLogin,
      userInfo,
      wordData,
      handleInput,
      addWordData,
      currentWord,
      word,
    } = this.props;
    const {
      handleLogout,
      postInputWord,
      updateWordData,
      deleteWordData,
      addSentences,
    } = this.props;
    return (
      <div>
        <div>
          <Main_Header
            isLogin={isLogin}
            userInfo={userInfo}
            handleLogout={handleLogout}
          />
        </div>
        <div>
          <WordInput
            word={word}
            postInputWord={postInputWord}
            handleInput={handleInput}
            addWordData={addWordData}
            currentWord={currentWord}
            wordData={wordData ? wordData : null}
          />
        </div>
        <div>
          <WordCardStack
            wordData={wordData ? wordData : null}
            addWordData={addWordData}
            postInputWord={postInputWord}
            updateWordData={updateWordData}
            deleteWordData={deleteWordData}
            handleInput={handleInput}
            addSentences={addSentences}
          />
        </div>
      </div>
    );
  }
}
export default Main;
