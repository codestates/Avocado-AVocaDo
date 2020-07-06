import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

function Pagination(props) {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  // ceil -> 반내림
  const pageCount = Math.ceil(itemsCount / pageSize);

  // page 2 를 넘어가지 않으면 표시하지 않음
  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
            style={{ cursor: 'pointer' }}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  itemsCount: PropTypes.string.isRequired,
  pageSize: PropTypes.string.isRequired,
  currentPage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
