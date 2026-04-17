import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import "./pagination.css";

const PaginationComp = ({ totalPage, setPage }) => {
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setPage(pageNumber);
  };

  const pageItems = [];
  for (let page = 1; page <= totalPage; page++) {
    pageItems.push(
      <Pagination.Item
        key={page}
        active={page === activePage}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="justify-content-center custom_pagination_wapper w-100 mt-3">
      <Pagination.Prev
        disabled={activePage === 1}
        onClick={() => handlePageChange(activePage - 1)}
      />

      {pageItems}

      <Pagination.Next
        disabled={activePage === totalPage}
        onClick={() => handlePageChange(activePage + 1)}
      />
    </Pagination>
  );
};

export default PaginationComp;
