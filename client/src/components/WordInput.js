/* eslint-disable */
import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';
import '../CSS/Main.css';
import kmp from 'kmp-matcher';
import _ from 'lodash';
class WordInput extends Component {
  constructor(props) {
    super(props);

    // props 쓸려면 this bind 해야함
    this.submitWord = this.submitWord.bind(this);
  }
  submitWord(e) {
    e.preventDefault();

    const findingWord = this.props.currentWord;

    let findResult = _.find(this.props.word, function (word) {
      return word === findingWord;
    });

    if (findResult) {
      alert('이미 단어장에 있는 단어입니다!');
      document.querySelector('.word_input').value = '';
    } else {
      // TODO: 무조건 서버에 보내고 get 으로 받아서 data 를 초기화 시켜야 함
      this.props.postInputWord();
    }

    document.querySelector('.word_input').value = '';
  }

  render() {
    return (
      <div className="wordinput_wrap">
        <div className="wordinput_container">
          <div className="wordinput_field">
            <form className="wordinput_form" onSubmit={this.submitWord}>
              <div className="wordinput_area">
                <div className="wordinput_row">
                  <span className="wordinput_box">
                    <input
                      className="word_input"
                      type="text"
                      placeholder="단어를 입력하세요"
                      onChange={this.props.handleInput('currentWord')}
                    ></input>
                  </span>
                </div>
              </div>
              <div className="wordinput_btn_area">
                <input className="wordinput_btn" type="submit" value="🥑" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// WordInput.propTypes = {
//   addWordData: PropTypes.func.isRequired,
//   handleInput: PropTypes.func.isRequired,
// };

export default WordInput;
