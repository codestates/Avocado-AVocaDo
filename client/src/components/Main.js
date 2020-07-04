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

  /*       wordData: [
       
        {
          word: 'apple',
          sentences: ['I like apple', 'I hate apple'],
        },
      ],
      
      
      */

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
    const findingWord = `"word":"${this.state.currentWord}"`;

    const searchResult =
      kmp.kmp(JSON.stringify(this.state.wordData), findingWord).length > 0;

    if (searchResult) {
      alert('이미 단어장에 있는 단어입니다!');
    } else {
      this.state.wordData.push({ word: this.state.currentWord, sentences: [] });
      this.setState({ wordData: this.state.wordData });
    }
  };

  handleSentenseData = (sentences, word, index) => {
    /* 모달창에서 입력하고 저장버튼을 누르면 클릭한 부분의 데이터가 변하는 게 아니라 데이터가 중복으로 생성되어 추가가 된다.
    
    ex> 단어 apple ~~~ , 문장~~~ ⇒ 클릭해서 모달창을 띄우고 수정을 하고 저장버튼을 누르면 
    
    똑같은 단어가 중복되어 들어간다. 
    문제는 단순히 데이터를 push 하기 때문에 중복으로 들어간다. 
    해결은 클릭을 했을 때의 단어 객체에서 문장을 수정 및 반영이 되어야 한다. 
    현재는 클릭을 했을 때의 단어 객체에서 문장이 추가되는 것이 아니라 그냥 새로운 단어객체에 문장을 추가하여 전체 배열에 push 하고 있다. */

    /* 
    
    해결은 클릭을 했을 때의 단어 객체에 수정한 문장으로 덮어씌워야 함 
    
    클릭을 했을 때의 특정 단어 객체를 찾으면 덮어 씌우기는 쉬움
    
    
    아이디어1> 
    
    전체를 json 으로 변환한 다음 kmp 로 찾아서 문자열을 교체하기 
    
    저장버튼을 누를때 단어를 알고 있다. 
    
    {word:apple, sentence:[a,b,c,d]}
    
    
    아이디어 2> 
    
    처음에 data 저장할 때 클라이언트에서만 관리하는 index 부여 
    
    wordcard 에 보낼 때 같이 보냄 
    
    인덱스로 단어 객체 찾아서 문장을 덮어 씌운다. 
    
    
    */
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
