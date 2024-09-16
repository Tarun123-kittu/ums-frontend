import React from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import { useAppContext } from '../../Utils/appContecxt'
import BreadcrumbComp from '../../Breadcrumb/BreadcrumbComp'
import Notification from '../Notification/Notification'
import InputField from '../../Common/InputField'

const AddnewEmployee = () => {
const {show} = useAppContext()
const obj = [
    { name: "Employees", path: "/employee" },
    { name: "Add New Employees", path: "/addemployee" }
  ];

  return (
    <section>
    <Sidebar/>
    <div className={`wrapper admin_outer gray_bg ${show?"cmn_margin":""}`  }>
        <Notification/>
        <div className='cmn_padding_outer'>
        <BreadcrumbComp data={obj} classname={"inter_fontfamily employee_heading"} 
        />
        <div className='new_employee_wrapper cmn_border'>
            <form>
            <div className='row'>
                <div className='col-lg-4 col-sm-12 col-md-12'>
                    <InputField labelname={"Name"} span={true} placeholder={"Name of the employee"} classname={"new_employee_form_group"} type={"text"}/>
                   
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField labelname={"Email"}  span={true} placeholder={"Email of the employee"} classname={"new_employee_form_group"} type={"text"}/>

                  
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField labelname={"Mobile"} span={true} placeholder={"Mobile of the employee"} classname={"new_employee_form_group"} type={"text"}/>

                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField labelname={"Emergency Contact Relationship "} placeholder={"Relationship of the employee"} classname={"new_employee_form_group"} type={"text"}/>

                  
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField labelname={"Emergency Contact Name"} placeholder={"Emergency Contact Name"} classname={"new_employee_form_group"} type={"text"}/>

                  
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField labelname={"Emergency Contact"} placeholder={"Emergency mobile no of the employee"} classname={"new_employee_form_group"} type={"text"}/>

                   
                </div>

                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField labelname={"Bank Name"} placeholder={"Bank Name"} classname={"new_employee_form_group"} type={"text"}/>

                   
                </div>

                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField labelname={"Account Number"} placeholder={"Account Number"} classname={"new_employee_form_group"} type={"number"}/>

                   
                </div>

                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField labelname={"IFCE"} placeholder={"Bank IFCE Code"} classname={"new_employee_form_group"} type={"number"}/>

                   
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField labelname={"Increment Date"} placeholder={"04-02-2022"} classname={"new_employee_form_group"} type={"text"}/>

                  
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>

                    <div className='form-group new_employee_form_group'>
                        <label> Gender </label>
                        <select className='form-control'>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField labelname={"DOB"} placeholder={"01-02-1998"} classname={"new_employee_form_group"} type={"text"}/>

                
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField labelname={" DOJ"} placeholder={"01-02-2023"} span={true} classname={"new_employee_form_group"} type={"text"}/>

                   
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField labelname={"Skepe"} placeholder={"Skepe"} classname={"new_employee_form_group"} type={"text"}/>
                </div>

                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField labelname={"Ultivic Email"} placeholder={"Ultivic Email"} classname={"new_employee_form_group"} type={"text"}/>

                   
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField isRequred={true} symbol={"₹"}  labelname={"Salary"} placeholder={"Salary"} classname={"new_employee_form_group"} type={"text"}/>

                    
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField isRequred={true} symbol={"%"} labelname={"Security"} placeholder={"Security"} classname={"new_employee_form_group"} type={"number"}/>

                    
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField isRequred={true} symbol={"₹"}  labelname={"Total Security"} placeholder={"Security"} classname={"new_employee_form_group"} type={"number"}/>

                    
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>

                    <div className='form-group new_employee_form_group'>
                        <label> Installment</label>
                        <select className='form-control'>
                            <option>1</option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>

                    <div className='form-group new_employee_form_group'>
                        <label> Position <span style={{color:"red"}}>*</span></label>
                        <select className='form-control'>
                            <option>Intern</option>
                        </select>
                    </div>
                </div>

                <div className='col-lg-4 col-sm-12 col-md-12'>

                    <div className='form-group new_employee_form_group'>
                        <label> Technology/Department <span style={{color:"red"}}>*</span></label>
                        <select className='form-control'>
                            <option>N/A</option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>

                    <div className='form-group new_employee_form_group'>
                        <label> Staus <span style={{color:"red"}}>*</span></label>
                        <select className='form-control'>
                            <option>N/A</option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField span={true} labelname={"Username"} placeholder={"Username"} classname={"new_employee_form_group"} type={"text"}/>

                 
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField labelname={"Password"} placeholder={"Password"} classname={"new_employee_form_group"} type={"password"}/>

                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>
                <InputField labelname={"Confirm Password"} placeholder={"Confirm Password"} classname={"new_employee_form_group"} type={"password"}/>

                 
                </div>
                <div className='col-lg-4 col-sm-12 col-md-12'>

                    <div className='form-group new_employee_form_group'>
                        <label> Role</label>
                        <select className='form-control'>
                            <option>Select Role</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='form-group new_employee_form_group'>
                <label>Address</label>
                <textarea className='form-control mt-3' placeholder='Address' rows={5}/>
            </div>
            <div className='text-end mt-3'>
                <button className='cmn_Button_style'>Save</button>
            </div>
            </form>
        </div>

        </div>
    </div>
   </section>
  )
}

export default AddnewEmployee