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

  render() {
    console.log('Main', this.props);
    const {
      isLogin,
      userInfo,
      wordData,
      handleInput,
      addWordData,
      currentWord,
    } = this.props;
    const {
      handleLogout,
      postInputWord,
      updateWordData,
      deleteWordData,
      handleSentenceData,
    } = this.props;
    return (
      <div>
        <div className="main_header_wrap">
          <Main_Header
            isLogin={isLogin}
            userInfo={userInfo}
            handleLogout={handleLogout}
          />
        </div>
        <div>
          <WordInput
            postInputWord={postInputWord}
            handleInput={handleInput}
            addWordData={addWordData}
            currentWord={currentWord}
            wordData={wordData}
          />
        </div>
        <div>
          <WordCardStack
            wordData={wordData}
            postInputWord={postInputWord}
            updateWordData={updateWordData}
            deleteWordData={deleteWordData}
            handleSentenceData={handleSentenceData}
            handleInput={handleInput}
          />
        </div>
      </div>
    );
  }
}
export default Main;
