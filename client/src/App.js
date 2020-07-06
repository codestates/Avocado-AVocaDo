/* eslint-disable */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; // userHistory
import axios from 'axios';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './components/Main';
import Wordbook from './components/Wordbook';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      userInfo: null,
      currentWord: null,
      wordData: [
        {
          word: 'apple',
          sentences: ['I like apple', 'I hate apple'],
        },
        {
          word: '1',
          sentences: ['123', '123'],
        },
        {
          word: '2',
          sentences: ['123', '123'],
        },
        {
          word: '3',
          sentences: ['123', '123'],
        },
        {
          word: '4',
          sentences: ['123', '123'],
        },
        {
          word: '5',
          sentences: ['123', '123'],
        },
        {
          word: '6',
          sentences: ['123', '123'],
        },
        {
          word: '7',
          sentences: ['123', '123'],
        },
        {
          word: '8',
          sentences: ['123', '123'],
        },
        {
          word: '9',
          sentences: ['123', '123'],
        },
        {
          word: '10',
          sentences: ['123', '123'],
        },
      ],
    };
  }

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

    const url = 'http://localhost:8080/words';
    axios
      .post(url, {
        word: this.state.currentWord,
      })
      .then((res) => {
        console.log(res);
      });
  }

  updateWordData(word, sentences) {
    // put 요청: 유저가 단어를 수정한 경우, 또는 예문을 수정/추가/삭제한 경우 그 값을 서버에 전송한다.
    axios
      .put('http://localhost:8080/words/sentences', {
        word: word,
        sentences: sentences,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log('updateWordData', e);
      });
  }

  deleteWordData(index) {
    // delete 요청: 유저가 단어/예문을 삭제한 경우 서버에 삭제를 요청한다.
    axios.delete('url/:userId/:wordId...', {
      withCredentials: true,
    });

    this.state.wordData.splice(index, 1);
    this.setState({ wordData: this.state.wordData });
  }

  handleInput = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  // 전달인자로 받아서 반영하면 되지 않나??
  addWordData = () => {
    this.state.wordData.push({ word: this.state.currentWord, sentences: [] });
    this.setState({ wordData: this.state.wordData });
  };

  handleSentenceData = (word, sentences, index) => {
    this.state.wordData[index] = {
      word: word,
      sentences: sentences,
    };

    this.setState({ wordData: this.state.wordData });
  };

  render() {
    const { isLogin, userInfo, wordData, currentWord } = this.state;
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
                isLogin={isLogin}
                userInfo={userInfo}
                wordData={wordData}
                currentWord={currentWord}
                handleLogout={this.handleLogout.bind(this)}
                postInputWord={this.postInputWord.bind(this)}
                updateWordData={this.updateWordData.bind(this)}
                deleteWordData={this.deleteWordData.bind(this)}
                handleInput={this.handleInput.bind(this)}
                addWordData={this.addWordData.bind(this)}
                handleSentenceData={this.handleSentenceData.bind(this)}
              />
            )}
          />
          <Route
            exact
            path="/wordbook"
            render={() => (
              <Wordbook
                userInfo={userInfo}
                wordData={wordData}
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
              if (isLogin) {
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
