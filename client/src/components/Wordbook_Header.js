import React from 'react';
import { Link } from 'react-router-dom';

import '../CSS/Wordbook.css';


function Wordbook_Header() {
  return (
    <nav className="wordbook_nav">
      <Link to="/main">
        <h3>이전 페이지로</h3>
      </Link>
      <div>
        <input type="text">ㅇㅇ</input>
      </div>
      <Link to="/">
        <h3>LOGOUT</h3>
      </Link>
    </nav>
  );
}
export default Wordbook_Header;
