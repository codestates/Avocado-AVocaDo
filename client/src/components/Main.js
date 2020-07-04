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
    const { userInfo, wordData } = this.state;
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
            isLogin={this.state.isLogin}
            userInfo={userInfo}
            handleLogout={this.props.handleLogout}
          />
        </div>
        <div>
          <WordInput postInputWord={this.postInputWord} />
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
