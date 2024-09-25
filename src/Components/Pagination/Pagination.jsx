import React, { useState } from 'react'
import {Pagination} from "react-bootstrap"
import "./pagination.css"
const PaginationComp = () => {
   
  return (
    <div>
        <Pagination className="justify-content-center custom_pagination_wapper">
          <Pagination.Prev/>
       
            <Pagination.Item active>
              1
            </Pagination.Item>
       
          <Pagination.Next/>
        </Pagination>
    </div>
  )
}

export default PaginationComp