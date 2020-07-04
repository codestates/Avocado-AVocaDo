import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Main.css';

function Main_Header() {
  return (
    <nav className="main_nav">
      <div>
        <Link to="/">
          {' '}
          {/* 또는, /login */}
          <h3>LOGOUT</h3>
        </Link>
        <Link to="/wordbook">
          <h3>MY WORDBOOK</h3>
        </Link>
      </div>
    </nav>
  );
}
export default Main_Header;
