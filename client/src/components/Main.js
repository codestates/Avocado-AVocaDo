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
    const {
      isLogin,
      userInfo,
      wordData,
      handleInput,
      addWordData,
    } = this.props;
    const {
      handleLogout,
      postInputWord,
      updateWordData,
      deleteWordData,
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
            postInputWord={postInputWord}
            handleInput={handleInput}
            addWordData={addWordData}
          />
        </div>
        <div>
          <WordCardStack
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
export default Main;
