import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Main.css';

function Header_wordbook() {
  return (
    <nav className="wordbook_nav">
      <Link to="/wordbook">
        <h3>이전 페이지로</h3>
      </Link>
      <Link to="/">
        <h3>LOGOUT</h3>
      </Link>
    </nav>
  );
}
export default Header_wordbook;
