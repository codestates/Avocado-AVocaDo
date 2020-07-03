import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../CSS/Main.css';

class WordInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { postInputWord, handleWordInput } = this.props;
    return (
      <div className="wordinput_wrap">
        <div className="wordinput_container">
          <form
            className="wordinput_form"
            onSubmit={(e) => {
              e.preventDefault();
              postInputWord();
            }}
          >
            <div className="wordinput_area">
              <div className="wordinput_row">
                <span className="input_box">
                  <input
                    type="text"
                    placeholder="단어를 입력하세요"
                    onChange={handleWordInput}
                  ></input>
                  <input type="submit" value="🥑" />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

WordInput.propTypes = {
  postInputWord: PropTypes.func.isRequired,
  handleWordInput: PropTypes.func.isRequired,
};

export default WordInput;
