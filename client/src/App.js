/* eslint-disable */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; // userHistory
import axios from 'axios';
import _ from 'lodash';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './components/Main';
import Wordbook from './components/Wordbook';
/* App wordId 추가 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      userInfo: null,
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

    console.log('handleLogout', this.state);
  }
  getWordData() {
    const url = 'http://54.180.104.184:8080/words';
    return axios.get(url).then((res) => {
      const wordArr = _.map(res.data.data, function (wordObj) {
        return _.values(wordObj.word)[0];
      })
        .then((res) => {
          this.setState({ wordData: res.data.data });
        })
        .then(() => {
          this.setState({ word: wordArr });
        });
    });
  }
  postInputWord() {
    // post 요청: 유저가 입력한 새로운 단어/예문을 서버에 전송한다.
    const url = 'http://54.180.104.184:8080/words';
    axios
      .post(url, {
        word: this.state.currentWord,
      })
      .then((res) => {
        // test 위해 넣은 code
        // 실제론 아래 TODO 로 변경해야 함
        this.setState({ wordData: res.data.data });
      })
      .then(() => {
        this.getWordData();
      });
  }

  addSentences(wordObj) {
    // 문장이 없는 상태에서만 호출되어야 함!!
    // put 요청: 유저가 단어를 수정한 경우, 또는 예문을 수정/추가/삭제한 경우 그 값을 서버에 전송한다.

    // api 형식에 맞추기 위함.
    const url = 'http://54.180.104.184:8080/words';
    let word = {};
    word[wordObj.wordId] = wordObj.word;
    let sentences = wordObj.sentences;
    let addSentenceObj = { word: word, sentences: sentences };
    // {word:{1:'adsfasdfa'},sentence:['a','b','c']}
    console.log('addSentences', addSentences);
    axios
      .post(url, addSentenceObj)
      .then((res) => {
        console.log(res);
        this.setState({ wordData: res.data.data });
      })
      .then(() => {
        this.getWordData();
      });
  }
  // res.config.data / res.data.data

  updateWordData(wordObj) {
    // api 형식에 맞추기 위함
    const url = 'http://54.180.104.184:8080/words';
    let sendWord = {};
    sendWord[wordObj.wordId] = wordObj.word;
    let sendObj = {};
    sendObj['word'] = sendWord;
    sendObj['sentences'] = wordObj.sentences;

    // put 요청: 유저가 단어를 수정한 경우, 또는 예문을 수정/추가/삭제한 경우 그 값을 서버에 전송한다.
    axios
      .post(url, sendObj)
      .then((res) => {
        console.log(res);
        this.setState({ wordData: res.data.data });
      })
      .then(() => {
        this.getWordData();
      });
  }

  deleteWordData(wordObj) {
    // TODO: sentenceIds => sentence Id 배열
    // delete 요청: 유저가 단어/예문을 삭제한 경우 서버에 삭제를 요청한다.
    const url = 'http://54.180.104.184:8080/words';
    // api 형식에 맞추기 위함
    const { wordId } = wordObj;
    const wordIdobj = { wordId: wordId };
    console.log(`wordIdobj ${wordIdobj}`);

    axios
      .delete(url, {
        data: wordIdobj,
        withCredentials: true,
      })
      .then((res) => {
        this.setState({ wordData: res.data.data });
      })
      .then(() => {
        this.getWordData();
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
                    handleLogout={this.handleLogout.bind(this)}
                  />
                );
              }
            }}
          />
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route
            exact
            path="/main"
            render={() => (
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
            )}
          />
          <Route
            exact
            path="/wordbook"
            render={() => (
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
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
