/* eslint-disable */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from './Header';
import WordInput from './WordInput';
import WordCardStack from './WordCardStack';
// npm i --save kmp-matcher
import kmp from 'kmp-matcher';
import '../CSS/Main.css';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWord: '',
      wordData: [
        {
          word: 'apple',
          sentences: ['I like apple', 'I hate apple'],
        },
      ],
    };
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
    // delete 요청 body로 보내는 코드 추가
  }

  handleInput = (key) => (e) => {
    this.setState({ [key]: e.target.value });
    console.log(this.state);
  };

  addWordData = () => {
    this.state.wordData.push({ word: this.state.currentWord, sentences: [] });
    this.setState({ wordData: this.state.wordData });
  };

  handleSentenseData = (sentences, word, index) => {
    const splitSentences = sentences.split('\n');

    this.state.wordData[index] = {
      word: word,
      sentences: splitSentences,
    };
    // this.state.wordData.push({
    //   word: this.state.currentWord,
    //   sentences: splitSentences,
    // });

    this.setState({ wordData: this.state.wordData });

    console.log('변경확인', this.state);
  };

  componentDidMount() {}

  render() {
    console.log('render', this.state);
    return (
      <div>
        <div className="header_wrap">
          <Header
            isLogin={this.state.isLogin}
            userInfo={this.props.userInfo}
            handleLogout={this.props.handleLogout}
          />
        </div>
        <div className="wordinput_wrap">
          <WordInput
            // 단어를 추가했을 때 서버로 부터 데이터를 받아오지 않고
            // 클라이언트에서 state 를 변경시켜 데이터를 update 한다.
            currentWord={this.state.currentWord}
            wordData={this.state.wordData}
            handleInput={this.handleInput.bind(this)}
            addWordData={this.addWordData.bind(this)}
            postInputWord={this.postInputWord.bind(this)}
          />
        </div>
        <div className="wordcardstack_wrap">
          <WordCardStack
            wordData={this.state.wordData}
            postInputWord={this.postInputWord.bind(this)}
            updateWordData={this.updateWordData.bind(this)}
            deleteWordData={this.deleteWordData.bind(this)}
            addWordData={this.addWordData.bind(this)}
            handleInput={this.handleInput.bind(this)}
            handleSentenseData={this.handleSentenseData.bind(this)}
          />
        </div>
      </div>
    );
  }
}

// Main.propTypes = {
//   isLogin: PropTypes.bool.isRequired,
//   currentWord: PropTypes.string.isRequired,
//   wordData: PropTypes.object.isRequired,
//   userInfo: PropTypes.object.isRequired,
//   handleInput: PropTypes.func.isRequired,
//   handleLogout: PropTypes.func.isRequired,
//   postInputWord: PropTypes.func.isRequired,
//   addWordData: PropTypes.func.isRequired,
//   updateWordData: PropTypes.func.isRequired,
//   deleteWordData: PropTypes.func.isRequired,
// };

export default Main;
