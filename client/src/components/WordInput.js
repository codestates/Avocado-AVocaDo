/* eslint-disable */
import React, { Component } from 'react';

class WordInput extends Component {
  constructor(props) {
    super(props);

    //   this.handleWordInput = this.handleWordInput.bind(this);
    // }

    // handleWordInput = (e) => {
    //   this.setState({ currentWord: e.target.value })
  }

  render() {
    const { postInputWord } = this.props;
    return (
      <div>
        <form
          className="wordinput_form"
          onSubmit={(e) => {
            e.preventDefault();
            this.handleWordInput('currentWord');
            postInputWord();
          }}
        >
          <input type="text" placeholder="단어를 입력하세요"></input>
          <input type="submit" value="🥑" />
        </form>
      </div>
    );
  }
}

export default WordInput;
