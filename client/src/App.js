/* eslint-disable */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; // userHistory
import axios from 'axios';
import _ from 'lodash';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './components/Main';
import Wordbook from './components/Wordbook';
axios.defaults.withCredentials = true;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      userInfo: '김경원',
      currentWord: null,
      wordData: '',
      word: '',
    };

    this.getWordData = this.getWordData.bind(this);
    this.addSentences = this.addSentences.bind(this);
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
    axios.get('http://localhost:8080/words').then((res) => {
      let wordArr = _.map(res.data.data, function (wordObj) {
        return _.values(wordObj.word)[0];
      });
      this.setState({ word: wordArr });
      this.setState({ wordData: res.data.data });
    });
  }
  postInputWord() {
    // post 요청: 유저가 입력한 새로운 단어/예문을 서버에 전송한다.

    // 새로운 단어 추가시
    // wordId 가 1부터 시작하여 wordDataLength 에 +1 하여 post 보냄
    const url = 'http://localhost:8080/words';
    axios
      .post(url, {
        word: this.state.currentWord,
      })
      .then((res) => {
        // test 위해 넣은 code
        // 실제론 아래 TODO 로 변경해야 함
        this.setState({ wordData: res.data.data });
      });
  }

  // TODO: sentences id 를 어떻게 줘야할까

  // 배열 or 객체
  // 수정했을 때는 어떻게 관리되어야 할까?
  // 1 > 예문추가
  // 인덱스? key?
  // 원래는 빈배열
  // 추가할 때마다 index 생성
  // 1,2,3 {}
  // sentences: {1:'a',2:'b',3:'c'}
  // 수정 후 => sentences: {1:'d',2:'e',3:'f'}

  addSentences(wordObj) {
    // 문장이 없는 상태에서만 호출되어야 함!!
    // put 요청: 유저가 단어를 수정한 경우, 또는 예문을 수정/추가/삭제한 경우 그 값을 서버에 전송한다.

    let word = {};
    word[wordObj.wordId] = wordObj.word;
    let sentences = wordObj.sentences;
    let addSentenceObj = { word: word, sentences: sentences };
    // {word:{1:'adsfasdfa'},sentence:['a','b','c']}
    console.log('addSentences', addSentences);
    axios
      .post('http://localhost:8080/words/sentences', addSentenceObj)
      .then((res) => {
        console.log(res);
        this.setState({ wordData: res.data.data });
      })
      .catch((e) => {
        console.log('updateWordData', e);
      });
  }

  updateWordData(wordObj) {
    let sendWord = {};
    sendWord[wordObj.wordId] = wordObj.word;
    let sendObj = {};

    sendObj['word'] = sendWord;
    sendObj['sentences'] = wordObj.sentences;
    // put 요청: 유저가 단어를 수정한 경우, 또는 예문을 수정/추가/삭제한 경우 그 값을 서버에 전송한다.
    axios
      .post('http://localhost:8080/words/sentences', sendObj)
      .then((res) => {
        console.log(res);
        this.setState({ wordData: res.data.data });
      })
      .catch((e) => {
        console.log('updateWordData', e);
      });
  }

  deleteWordData(wordObj) {
    // TODO: sentenceIds => sentence Id 배열
    // delete 요청: 유저가 단어/예문을 삭제한 경우 서버에 삭제를 요청한다.

    const { wordId } = wordObj;

    const wordIdobj = { wordId: wordId };

    console.log(`wordIdobj ${wordIdobj}`);
    axios
      .delete('http://localhost:8080/words', {
        data: wordIdobj,
        withCredentials: true,
      })
      .then((res) => {
        this.setState({ wordData: res.data.data });
      });
    // wordId 가 배열 index 보다 1 크기 때문에 조정함
  }

  handleInput = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  // 전달인자로 받아서 반영하면 되지 않나??

  componentDidMount() {
    this.getWordData();
  }
  render() {
    console.log('render', this.state);
    const { isLogin, userInfo, wordData, currentWord, word } = this.state;
    return (
      // route 는 순차적으로 실행된다.
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              if (isLogin) {
                return <Redirect to="/main" />;
              } else {
                return (
                  <Login
                    isLogin={isLogin}
                    handleLogin={this.handleLogin.bind(this)}
                  />
                );
              }
            }}
          />
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route
            exact
            path="/main"
            render={() => {
              return (
                <Main
                  word={word}
                  isLogin={isLogin}
                  userInfo={userInfo}
                  wordData={wordData ? wordData : null}
                  currentWord={currentWord}
                  handleLogout={this.handleLogout.bind(this)}
                  postInputWord={this.postInputWord.bind(this)}
                  updateWordData={this.updateWordData.bind(this)}
                  deleteWordData={this.deleteWordData.bind(this)}
                  handleInput={this.handleInput.bind(this)}
                  addSentences={this.addSentences.bind(this)}
                />
              );
            }}
          />
          <Route
            exact
            path="/wordbook"
            render={() => {
              if (wordData) {
                return (
                  <Wordbook
                    userInfo={userInfo}
                    wordData={wordData ? wordData : null}
                    handleLogout={this.handleLogout.bind(this)}
                    updateWordData={this.updateWordData.bind(this)}
                    deleteWordData={this.deleteWordData.bind(this)}
                    word={word}
                    isLogin={isLogin}
                    currentWord={currentWord}
                    handleInput={this.handleInput.bind(this)}
                    addSentences={this.addSentences.bind(this)}
                  />
                );
              } else {
                return 'noWord!';
              }
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
