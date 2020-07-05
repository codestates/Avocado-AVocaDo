/* eslint-disable */
import React from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom'; // userHistory

import Header from './Header';
import WordInput from './WordInput';
import WordCardStack from './WordCardStack';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLogin, userInfo, wordData } = this.props;
    const {
      handleLogout,
      postInputWord,
      updateWordData,
      deleteWordData,
    } = this.props;
    return (
      <div>
        <div className="header">
          <Header
            isLogin={isLogin}
            userInfo={userInfo}
            handleLogout={handleLogout}
          />
        </div>
        <div>
          <WordInput postInputWord={postInputWord} />
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
