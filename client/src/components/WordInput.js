/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../CSS/Main.css';

class WordInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleInput, addWordData } = this.props;
    const { postInputWord } = this.props;
    return (
      <div className="wordinput_wrap">
        <div className="wordinput_container">
          <form
            className="wordinput_form"
            onSubmit={(e) => {
              e.preventDefault();
              addWordData();
              document.querySelector('.word_input').value = '';
              postInputWord();
            }}
          >
            <div className="wordinput_field">
              <div className="wordinput_area">
                <div className="wordinput_row">
                  <span className="wordinput_box">
                    <input
                      className="word_input"
                      type="text"
                      placeholder="단어를 입력하세요"
                      onChange={handleInput('currentWord')}
                    ></input>
                  </span>
                </div>
              </div>
              <div className="wordinput_btn_area">
                <input className="wordinput_btn" type="submit" value="🥑" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

WordInput.propTypes = {
  addWordData: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
};

export default WordInput;
