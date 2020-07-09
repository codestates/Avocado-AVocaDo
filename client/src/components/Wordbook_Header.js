/* eslint-disable */
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../CSS/Wordbook.css';
import { func } from 'prop-types';

function Wordbook_Header(props) {
  const { searchText, isSearch, handleSearch, handleLogout } = props;
  const [searchInput, setSearchText] = useState('');

  function handleInputSearch(e) {
    setSearchText(e.target.value);
  }

  function querySearchText(e) {
    e.preventDefault();
    const queryText = document.querySelector('.form-control').value;
    handleSearch(queryText);
  }
  return (
    <nav className="wordbook_nav">
      <Link to="/main">
        <h5>❮</h5>
      </Link>

      <div className="form_search_box">
        <Form onSubmit={querySearchText}>
          <Form.Control
            inline
            type="text"
            placeholder="검색"
            maxLength="20"
            onChange={handleInputSearch}
          />
        </Form>

        <button
          type="submit"
          title="검색"
          className="btn_submit"
          onClick={querySearchText}
        >
          <span className="ico_search_submit"></span>
        </button>
      </div>
      <Link to="/" onClick={handleLogout}>
        <h3>LOGOUT</h3>
      </Link>
    </nav>
  );
}
export default Wordbook_Header;
