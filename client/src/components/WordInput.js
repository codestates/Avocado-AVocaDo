import React from 'react';

export default function WordInput() {
  return (
    <div>
      <form className="wordinput_form">
        <input type="text" placeholder="단어를 입력하세요"></input>
        <button type="submit">제출</button>
      </form>
      <form className="wordinput_form">
        <input type="text" placeholder="예문을 입력하세요"></input>
        <button type="submit">제출</button>
      </form>
    </div>
  );
}
