/* eslint-disable */
import React, { Component } from 'react';

class WordInput extends Component {
  constructor(props) {
    super(props);

    this.handleWordInput = this.handleWordInput.bind(this);
  }

  handleWordInput = (e) => {
    this.setState({ currentWord: e.target.value });
    // 이 컴포넌트에 state가 없는데 setState를 쓸 수 있는지?
    // 확인 필요
  };

  render() {
    const { postInputWord } = this.props;
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
                    onChange={this.handleWordInput}
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

export default WordInput;
