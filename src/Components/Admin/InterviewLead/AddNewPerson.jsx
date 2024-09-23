import React from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import { useAppContext } from '../../Utils/appContecxt'
import BreadcrumbComp from '../../Breadcrumb/BreadcrumbComp'
import InputField from '../../Common/InputField'
import Notification from '../Notification/Notification'
import Select from '../../Common/Select'

const AddNewPerson = () => {
    const obj = [
        { name: "Interview Lead", path: "/interviewLead" },
        { name: "Add Person", path: "/addPerson" }
      ];
const {show}=useAppContext()
const options=[
    { value: "Male", option: "Male" },
    { value: "Female", option: "Female" },
]
const selectProfileData=[
    { value: "ui/ux", option: "ui/ux" },
    { value: "Backend Developer", option: "Backend Developer" },
]
const selectStateData=[
    { value: "Punjab", option: "Punjab" },
    { value: "Delhi", option: "Delhi" },
]

  return (
    <section>
    <Sidebar/>
  <div className={`wrapper gray_bg admin_outer ${show?"cmn_margin":""}`  }>
    <Notification/>
  
    <div className='employee_wrapper cmn_padding_outer'>
      <BreadcrumbComp data={obj} classname={"inter_fontfamily employee_heading"} 
      />
     <div className='cmn_border px-4 pt-2 pb-4'>
        <form>
        <div className='row'>
            <div className='col-lg-4 col-sm-12 col-md-6'>
                <InputField labelname={"Full Name"} span={true} placeholder={"Enter Full Name"} classname={"new_employee_form_group"} type={"text"}/>
            </div>
            <div className='col-lg-4 col-sm-12 col-md-6'>
                <InputField labelname={"Phone Number"} span={true} placeholder={"Enter Phone Number"} classname={"new_employee_form_group"} type={"number"}/>
            </div>
            <div className='col-lg-4 col-sm-12 col-md-6'>
                <InputField labelname={"Email Address"} span={true} placeholder={"Enter Email Address"} classname={"new_employee_form_group"} type={"email"}/>
            </div>
            <div className='col-lg-4 col-sm-12 col-md-6'>
                <Select options={options} labelname={"Gender"} placeholder={"Select Gender"} labelClass={"new_employee_form_group"}/>
            </div>
            <div className='col-lg-4 col-sm-12 col-md-6'>
                <InputField labelname={"DOB"} span={true} placeholder={"Select DOB"} classname={"new_employee_form_group"} type={"date"}/>
            </div>
            <div className='col-lg-4 col-sm-12 col-md-6'>
                <InputField labelname={"Experience "} placeholder={"Enter Experience"} classname={"new_employee_form_group"} type={"number"}/>
            </div>
            <div className='col-lg-4 col-sm-12 col-md-6'>
                <InputField labelname={"Current salary (optional)"} placeholder={"Enter Current salary"} classname={"new_employee_form_group"} type={"text"}/>
            </div>
            <div className='col-lg-4 col-sm-12 col-md-6'>
                <InputField  labelname={"Expected salary (optional)"} placeholder={"Enter Expected salary"} classname={"new_employee_form_group"} type={"text"}/>
            </div>
            <div className='col-lg-4 col-sm-12 col-md-6'>
                <Select labelname={"Profile"} span={true} options={selectProfileData} placeholder={"Select Profile"} classname={"new_employee_form_group"}/>
            </div>
            <div className='col-lg-4 col-sm-12 col-md-6'>
                <InputField labelname={"Last Company (optional)"} placeholder={"Enter Last Company Name"} classname={"new_employee_form_group"} type={"text"}/>
            </div>
            <div className='col-lg-4 col-sm-12 col-md-6'>
                <Select  span={true}  labelname={"Select State"} options={selectStateData} placeholder={"Select State"} classname={"new_employee_form_group"}/>
            </div>
           
        </div>
        <div className='form-group new_employee_form_group'>
            <label>House Address <span style={{color:"red"}}>*</span></label>
            <textarea className='form-control mt-2' placeholder='Enter Address'  rows={5}/>
        </div>

        <div className='d-flex gap-2 mt-4 justify-content-end exit_save_btn_outer'>
            <button className='cmn_Button_style cmn_darkgray_btn'>Exit</button>
            <button className='cmn_Button_style'>Save</button>
        </div>
        </form>
     </div>
    
   
   
    </div>

  


  </div>
  </section>
  )
}

export default AddNewPerson