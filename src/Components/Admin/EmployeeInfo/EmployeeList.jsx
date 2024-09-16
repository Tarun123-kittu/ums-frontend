import React from 'react'
import { FaSort, FaSortDown } from "react-icons/fa";

import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaClock } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
const EmployeeList = () => {

const navigate=useNavigate()
  return (
    <div className='employee_list_outer'>
    <div className='d-flex employee_container align-items-center mt-3'>

    <div className='employee_wrapper'>
    <div className='new_employee_form_group'>

<label className="">Status</label>
<div class="custom-select-wrapper">

<select class="custom-select form-control" placeholder="Active">
   <option >Active</option>
</select>
<FaSort className='dropdown-icon '/>
</div>
</div>
        {/* <h4 className='inter_fontfamily'>Status</h4>
       <div className='serach_user_outer'>
        <input placeholder='Active'/>
       <div className='sort_outer d-flex '>
       <TiArrowSortedUp />
       <FaSortDown />
       </div>
       </div> */}
    </div>
   

    <div className='employee_wrapper'>
    <div className='new_employee_form_group'>

<label className="">Employee</label>
<div class="custom-select-wrapper">

<select class="custom-select form-control" placeholder="Search Employee">
   <option>Search Employee</option>
</select>
<FaSort className='dropdown-icon '/>
</div>
</div>
    </div>

   
    <div className='employee_wrapper text-end serach_add_outer'>
      <button className='cmn_Button_style'>Search</button>
      <button className='cmn_Button_style ms-3' onClick={()=>navigate("/addemployee")}>Add</button>
    </div>

    </div>

    <div className='table-responsive mt-3 transparent_bg'>
      <table className='employee_detail_table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>DOJ</th>
            <th>DOB</th>
            <th>Post</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>John</td>
            <td>John@gmail.com</td>
            <td>889423434</td>
            <td>07-07-24</td>
            <td>07-07-2000</td>
            <td>Intern</td>
            <td>On Probation</td>
            <td>
              <div className='d-flex gap-2'>
                <div className='cmn_action_outer dark_gray_bg'><FaEye /></div>
                <div className='cmn_action_outer red_bg'><RiDeleteBin6Line /></div>
                <div className='cmn_action_outer redbrown_bg'><FaClock /></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default EmployeeList