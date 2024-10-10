import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import "./pagination.css";
const PaginationComp = () => {
  return (
    <Pagination className="justify-content-center custom_pagination_wapper w-100 mt-3">
      <Pagination.Prev />

      <Pagination.Item active>1</Pagination.Item>

      <Pagination.Next />
    </Pagination>
  );
};

export default PaginationComp;
