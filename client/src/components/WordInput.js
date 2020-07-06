/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../CSS/Main.css';
import kmp from 'kmp-matcher';
class WordInput extends Component {
  constructor(props) {
    super(props);

    // props 쓸려면 this bind 해야함
    this.submitWord = this.submitWord.bind(this);
  }
  submitWord(e) {
    e.preventDefault();
    const findingWord = `"word":"${this.props.currentWord}"`;

    const searchResult =
      kmp.kmp(JSON.stringify(this.props.wordData), findingWord).length > 0;

    if (searchResult) {
      alert('이미 단어장에 있는 단어입니다!');
    } else {
      this.props.handleWordCardLength();
      this.props.addWordData();
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
