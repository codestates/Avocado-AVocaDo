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
    // delete 요청 body로 보내는 코드 추가
  }

  handleInput = (key) => (e) => {
    this.setState({ [key]: e.target.value });
    console.log(this.state);
  };

  addWordData = () => {
    // 단어만 추가할 때는 sentences 는 빈배열
    // 모달창에서 예문추가하면 sentences 에 엔터단위로 split 에서 push 함
    //

    // 단어가 중복이면 메서드가 실행되서는 안됨
    // 이미 단어가 있습니다!! => alert
    // kmp.kmp(전체문자열, 찾고자 하는 특정 문자열)

    // kmp.kmp() -> 길이가 1보다 크면 alert 띄우고 아니면 push 한다.

    // 전체문자열 -> 전체 단어의 모음
    // 특정문자열 -> this.state.currentWord
    // const wordArr = [];
    // this.state.wordData.forEach(element => {

    //   wordArr.push(element.word)
    // });

    // const stringTotalWord = JSON.stringify(wordArr);
    // "word":"원하는단어"
    // findingWord =
    const findingWord = `"word":"${this.state.currentWord}"`;
    console.log(
      '확인',
      kmp.kmp(JSON.stringify(this.state.wordData), findingWord)
    );

    const searchResult =
      kmp.kmp(JSON.stringify(this.state.wordData), findingWord).length > 0;

    if (searchResult) {
      alert('이미 단어장에 있는 단어입니다!');
    } else {
      this.state.wordData.push({ word: this.state.currentWord, sentences: [] });
      this.setState({ wordData: this.state.wordData });
    }
  };

  handleSentenseData = (sentences) => {
    const splitSentences = sentences.split('\n');
    // 단어가 중복되어 들어가게 된다.
    // 똑같은 단어가 있으면 해당 단어data 를 삭제하고 덮어씌워야
    // push 로 하면 안되!
    // setState 로 변경해야 함
    // 현재단어에 있는 문장에만 push 해야 함

    // 현재단어를 특정해야 함

    this.state.wordData.push({
      word: this.state.currentWord,
      sentences: splitSentences,
    });
    this.setState({ wordData: this.state.wordData });

    console.log('handleSentenseData', this.state);
  };

  componentDidMount() {
    // index 를 리턴한다.
  }
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
            postInputWord={this.postInputWord.bind(this)}
            // 단어를 추가했을 때 서버로 부터 데이터를 받아오지 않고
            // 클라이언트에서 state 를 변경시켜 데이터를 update 한다.
            currentWord={this.state.currentWord}
            wordData={this.state.wordData}
            handleInput={this.handleInput.bind(this)}
            addWordData={this.addWordData.bind(this)}
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
