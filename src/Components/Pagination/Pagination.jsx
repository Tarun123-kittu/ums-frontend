import React, { useState } from 'react'
import {Pagination} from "react-bootstrap"
import "./pagination.css"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
const PaginationComp = () => {
   
  return (
    <div>
        <Pagination className="justify-content-center custom_pagination_wapper">
        <Pagination.Prev>
          <FaArrowLeft /> Back
        </Pagination.Prev>

       
            <Pagination.Item active>
              1
            </Pagination.Item>
       
            <Pagination.Next>
          Next <FaArrowRight />
        </Pagination.Next>
        </Pagination>
    </div>
  )
}

export default PaginationComp