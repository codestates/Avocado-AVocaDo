import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; // userHistory
import axios from 'axios';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './components/Main';
class App extends React.Component {
  state = {
    isLogin: false,
    userInfo: null,
    currentWord: null,
    wordData: [
      {
        word: 'apple',
        sentence: ['I like apple', 'I hate apple'],
      },
    ],
  };
  handleLogin() {
    this.setState({
      isLogin: true,
    });
  }
  handleLogout() {
    this.setState({
      isLogin: false,
    });
  }
  getWordData() {
    // get 요청: 서버로부터 유저와 일치하는 모든 단어/예문을 불러온다.
    axios.get('url').then((res) => {
      this.setState({ wordData: res.data });
    });
  }
  postInputWord() {
    // post 요청: 유저가 입력한 새로운 단어/예문을 서버에 전송한다.
    axios
      .post('url', {
        currentWord: this.state.currentWord,
        wordData: this.state.wordData,
      })
      .then((res) => {
        console.log(res);
      });
  }
  updateWordData() {
    // put 요청: 유저가 단어를 수정한 경우, 또는 예문을 수정/추가/삭제한 경우 그 값을 서버에 전송한다.
    axios
      .put('url', {
        currentWord: this.state.currentWord,
        wordData: this.state.wordData,
      })
      .then((res) => {
        console.log(res);
      });
  }
  deleteWordData() {
    // delete 요청: 유저가 단어/예문을 삭제한 경우 서버에 삭제를 요청한다.
    axios.delete('url/:userId/:wordId...', {
      withCredentials: true,
    });
  }
  render() {
    const { isLogin } = this.state;
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Login
                isLogin={isLogin}
                handleLogin={this.handleLogin.bind(this)}
              />
            )}
          />
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route
            exact
            path="/main"
            render={() => (
              <Main
                userInfo={this.state.userInfo}
                wordData={this.state.wordData}
                handleLogout={this.handleLogout.bind(this)}
                postInputWord={this.postInputWord.bind(this)}
                updateWordData={this.updateWordData.bind(this)}
                deleteWordData={this.deleteWordData.bind(this)}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={() => {
              if (this.state.isLogin) {
                return <Redirect to="/main" />;
              }
              return <Redirect to="/" />;
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
