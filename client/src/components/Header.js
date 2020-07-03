import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Login.css';

function Header() {
  return (
    <nav className="nav">
      <Link to="/wordbook">
        <h3>My wordbook</h3>
      </Link>
      <Link to="/">
        {' '}
        {/* 또는, /login */}
        <h3>Logout</h3>
      </Link>
      <Link to="/main">
        {' '}
        {/* main 페이지에서는 보이지 않아야 한다. */}
        <h3>이전 페이지로(아이콘)</h3>
      </Link>
    </nav>
  );
}
export default Header;
