import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from './Header';
import WordInput from './WordInput';
import WordCardStack from './WordCardStack';
import '../CSS/Main.css';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWord: null,
      wordData: [
        {
          word: 'apple',
          sentence: ['I like apple', 'I hate apple'],
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

  handleWordInput = (e) => {
    this.setState({ currentWord: e.target.value });
    // 확인 필요
  };

  render() {
    const { wordData } = this.state;
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
            handleWordInput={this.handleWordInput.bind(this)}
          />
        </div>
        <div className="wordcardstack_wrap">
          <WordCardStack
            wordData={wordData}
            postInputWord={this.postInputWord.bind(this)}
            updateWordData={this.updateWordData.bind(this)}
            deleteWordData={this.deleteWordData.bind(this)}
          />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  userInfo: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Main;
