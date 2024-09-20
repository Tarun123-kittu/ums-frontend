import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import HrQuestionModal from '../../Modal/HrQuestionModal';
import { useState } from 'react';
import TechInterviewQuestionModal from '../../Modal/TechInterviewQuesModal';
import insight_icon from "../../assets/insight.svg"
import "./tabs.css"
import { useNavigate } from 'react-router-dom';
import CustomSelectComp from '../CustomSelectComp';

function TabComp() {
const[showHrQuestionModal,setShowHrQuestionModal]=useState(false)
const[showTechInterviewQuesModal,setShowTechInterviewQuesModal]=useState(false)
const resultData=[
  { value: 'Selected', label: 'Selected' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'On Hold', label: 'On Hold'},
]
const navigate=useNavigate("/viewQuestionlist")
const [activeTab, setActiveTab] = useState('Add Person'); // Manage active tab

const handleNextTab = () => {
  if(activeTab==="Technical"){
    setActiveTab('Face to face');

  }else if(activeTab==="Face to face"){
    setActiveTab("Final Interaction")
  }
  
   
};

  return (
<div>

    <Tabs
      defaultActiveKey="Add Person"
      id="uncontrolled-tab-example"
      className=" interview_lead_tabs_outer"
      activeKey={activeTab}
      onSelect={(k) =>{
        setActiveTab(k)
        console.log(k,"ke")
        
      } 
      }
    >
      <Tab eventKey="Add Person" title="Add Person">
      <div className='table-responsive transparent_bg'>
      <table className='employee_detail_table'>
        <thead>
        <tr>
            <th>Sr.no</th>
            <th>User Name</th>
            <th>Profile</th>
            <th>Experience</th>
            <th>Current salary</th>
            <th>Expected salray</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>
            <div className='d-flex justify-content-between align-items-center'>
            John
            <div className='icon_wrapper'>
            <img src={insight_icon} height={"17px"} width={"17px"} className='cursor_pointer'/>
            <div className='icon_content_outer'>
              <div className='triangle'></div>
             <div className='tooltip_content'>
            <ul className='user_info_detail_list'>
              <li className='d-flex gap-2'>
                <h3 className='cmn_text_heading'>Name :</h3>
                <h4 className='cmn_text_heading'>Michael Levi</h4>
              </li>
              <li className='d-flex gap-2'>
                <h3 className='cmn_text_heading'>Phone Number :</h3>
                <h4 className='cmn_text_heading'>3554656</h4>
              </li>
              <li className='d-flex gap-2'>
                <h3 className='cmn_text_heading'>Email :</h3>
                <h4 className='cmn_text_heading'>michael@gameil.com</h4>
              </li>
              <li className='d-flex gap-2'>
                <h3 className='cmn_text_heading'>Gender : </h3>
                <h4 className='cmn_text_heading'>Female</h4>
              </li>
              <li className='d-flex gap-2'>
                <h3 className='cmn_text_heading'>DOB : </h3>
                <h4 className='cmn_text_heading'>12-09-2000</h4>
              </li>
              <li className='d-flex gap-2'>
                <h3 className='cmn_text_heading'>Expereience : </h3>
                <h4 className='cmn_text_heading'>1</h4>
              </li>
              <li className='d-flex gap-2'>
                <h3 className='cmn_text_heading'>Current Salary :  </h3>
                <h4 className='cmn_text_heading'>12343</h4>
              </li>
              <li className='d-flex gap-2'>
                <h3 className='cmn_text_heading'>Expected Salary </h3>
                <h4 className='cmn_text_heading'>23444</h4>
              </li>
              <li className='d-flex gap-2'>
                <h3 className='cmn_text_heading'>Profile </h3>
                <h4 className='cmn_text_heading'>Developer</h4>
              </li>
              <li className='d-flex gap-2'>
                <h3 className='cmn_text_heading'>Last Company : </h3>
                <h4 className='cmn_text_heading'>Software Company</h4>
              </li>
              <li className='d-flex gap-2'>
                <h3 className='cmn_text_heading'>State : </h3>
                <h4 className='cmn_text_heading'>Punjab</h4>
              </li>
              <li className='d-flex gap-2'>
                <h3 className='cmn_text_heading'>House address :  </h3>
                <h4 className='cmn_text_heading'>Strret 56 chandigarh house no #4589</h4>
              </li>
              
            
            </ul>
            <div className='text-end'>
            <button className='cmn_Button_style' onClick={()=>{navigate("/editPerson")}}>Edit</button>
            </div>

             </div>

             </div>
            </div>
            </div>
            </td>
            <td>Java developer</td>
            <td>2</td>
            <td>12,000Rs</td>
            <td>20,000Rs</td>
            <td>
        
              <button className='cmn_Button_style' onClick={()=>{setShowHrQuestionModal(true)}}>Start</button>
           
            </td>
          </tr>
        </tbody>
      </table>
         </div>
      </Tab>
      <Tab eventKey=" HR" title="HR">
      <div className='table-responsive transparent_bg'>
      <table className='employee_detail_table'>
        <thead>
        <tr>
            <th>Sr.no</th>
            <th> User Name </th>
            <th>Profile</th>
            <th>Experience</th>
            <th>Interview rating/question</th>
            <th>Interview Result</th>
            <th>Start Next Round</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>
            <div className='d-flex justify-content-between align-items-center'>
           John
            <img src={insight_icon} height={"17px"} width={"17px"} />
            </div>
            </td>
            <td>Java developer</td>
            <td>2.5</td>
            <td style={{textDecoration:"underline",cursor:"pointer"}} onClick={()=>{navigate("/viewQuestionlist")}}>3.6 View Questions List</td>
            <td>
              <div className='form-group new_employee_form_group'>
              {/* <select className='form-control'>
                <option>On Hold</option>
              </select> */}
              <CustomSelectComp optionsData={resultData}/>
              </div>
            </td>
            <td>
        
              <button className='cmn_Button_style' onClick={()=>{setShowTechInterviewQuesModal(true)}}>Start</button>
           
            </td>
          </tr>
        </tbody>
      </table>
         </div>
      </Tab>
      <Tab eventKey="Technical" title="Technical">
      <div className='table-responsive transparent_bg'>
      <table className='employee_detail_table'>
        <thead>
        <tr>
            <th>Sr.no</th>
            <th> User Name </th>
            <th>Profile</th>
            <th>Experience</th>
            <th>Question/Answers</th>
            <th>Technical Result</th>
            <th>Start Next Round</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>
            <div className='d-flex justify-content-between align-items-center'>
           John
            <img src={insight_icon} height={"17px"} width={"17px"}/>
            </div>
            </td>
            <td>Java developer</td>
            <td>2.5</td>
            <td style={{textDecoration:"underline"}} onClick={()=>{navigate("/questionAnswerSheet")}}> View Questions List</td>
            <td>
              <div className='form-group new_employee_form_group'>
              <CustomSelectComp optionsData={resultData}/>

              </div>
            </td>
            <td>
        
              <button className='cmn_Button_style' onClick={handleNextTab}>Start</button>
           
            </td>
          </tr>
        </tbody>
      </table>
        </div>
      </Tab>
      <Tab eventKey="Face to face" title="Face to face">
      <div className='table-responsive transparent_bg'>
      <table className='employee_detail_table'>
        <thead>
        <tr>
            <th>Sr.no</th>
            <th> User Name </th>
            <th>Profile</th>
            <th>Experience</th>
            <th>Salary</th>
            <th>Technical Result</th>
            <th>Final Round</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>
            <div className='d-flex justify-content-between align-items-center'>
           John
            <img src={insight_icon} height={"17px"} width={"17px"}/>
            </div>
            </td>
            <td>Java developer</td>
            <td>2.5</td>
            <td> 20000Rs</td>
            <td>
              <div className='form-group new_employee_form_group'>
              <select className='form-control'>
                <option>On Hold</option>
              </select>

              </div>
            </td>
            <td>
        
              <button className='cmn_Button_style' onClick={handleNextTab}>Start</button>
           
            </td>
          </tr>
        </tbody>
      </table>
        </div>
      </Tab>
      <Tab eventKey="Final Interaction" title="Final Interaction">
      <div className='table-responsive transparent_bg'>
      <table className='employee_detail_table'>
        <thead>
        <tr>
            <th>Sr.no</th>
            <th> User Name </th>
            <th>Profile</th>
            <th>Experience</th>
            <th>Salary</th>
            <th>Technical Result</th>
            <th>Final Round</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>
            <div className='d-flex justify-content-between align-items-center'>
           John
            <img src={insight_icon} height={"17px"} width={"17px"}/>
            </div>
            </td>
            <td>Java developer</td>
            <td>2.5</td>
            <td> 20000Rs</td>
            <td>
              <div className='form-group new_employee_form_group'>
              <select className='form-control'>
                <option>On Hold</option>
              </select>

              </div>
            </td>
            <td>
        
              <button className='cmn_Button_style cmn_darkgray_btn'>Start</button>
           
            </td>
          </tr>
        </tbody>
      </table>
        </div>
      </Tab>
    </Tabs>
    {showTechInterviewQuesModal && <TechInterviewQuestionModal show={showTechInterviewQuesModal} setShow={setShowTechInterviewQuesModal}/>}
    {showHrQuestionModal && <HrQuestionModal show={showHrQuestionModal} setShow={setShowHrQuestionModal}/>}
</div>

  );
}

export default TabComp;