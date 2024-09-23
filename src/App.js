import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "../src/Components/Login/Login"
import Candidate from './Components/Candidate/Candidate';
import AdminDashboard from './Components/Admin/AdminDashboard/AdminDashboard';
import EmployeeInfo from './Components/Admin/EmployeeInfo/Employee';
import AddnewEmployee from './Components/Admin/EmployeeInfo/AddnewEmployee';
import HolidayEvent from './Components/Admin/HolidayEvent/HolidayEvent';
import IncompleteAttendence from './Components/Admin/Attendence/IncompleteAttendence';
import TodayAttendence from './Components/Admin/Attendence/TodayAttendence';
import AttendenceReport from './Components/Admin/Attendence/AttendenceReport';
import LeaveRequest from './Components/Admin/LeaveApplication/LeaveRequest';
import LeaveBank from './Components/Admin/LeaveApplication/LeaveBank';
import LeaveReport from './Components/Admin/LeaveApplication/LeaveReport';
import InterviewLead from './Components/Admin/InterviewLead/InterviewLead';
import AddNewPerson from './Components/Admin/InterviewLead/AddNewPerson';
import HrInterViewQuestion from './Components/Admin/InterviewLead/HrInterviewQuestion';
import RoleAndPermission from './Components/Admin/RoleAndPermission/RoleAndPermission';
import EditRoleAndPermission from './Components/Admin/RoleAndPermission/EditRoleAndPermission';
import ViewQuestionList from './Components/Admin/InterviewLead/ViewquestionList';
import QuestionAnswerSheet from './Components/Admin/InterviewLead/QuestionAnswerSheet';
import ViewEmployeeInfo from './Components/Admin/EmployeeInfo/ViewEmployeeInfo';
import EditEmployeeInfo from './Components/Admin/EmployeeInfo/EditEmployeeInfo';
import UnauthorizedPage from './Components/Unauthorized/UnauthorizedPage';
import EditPerson from './Components/Admin/InterviewLead/EditPerson';
import CustomToast from './Components/CustomToast/CustomToast';
import EditAttendence from './Components/Admin/Attendence/EditAttendence';
import CreateRole from './Components/Admin/RoleAndPermission/CreateRole';
import EditIncompleteAttendence from './Components/Admin/Attendence/EditIncompleteAttendence';
import EditAttendenceReport from './Components/Admin/Attendence/EditAttendenceReport';
import EditLeaveRequest from './Components/Admin/LeaveApplication/EditLeaveRequest';
import EditLeaveReport from './Components/Admin/LeaveApplication/EditleaveReport';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/candidate' element={<Candidate />} />
        <Route path='/dashboard' element={<AdminDashboard />} />
        <Route path='/employee' element={<EmployeeInfo />} />
        <Route path='/addemployee' element={<AddnewEmployee />} />
        <Route path='/todayAttendence' element={<TodayAttendence />} />
        <Route path='incompleteAttendence' element={<IncompleteAttendence />} />
        <Route path='/attendenceReport' element={<AttendenceReport />} />
        <Route path='/leaveRequest' element={<LeaveRequest />} />
        <Route path='/leaveBank' element={<LeaveBank />} />
        <Route path='/leaveReport' element={<LeaveReport />} />
        <Route path='/holiday' element={< HolidayEvent />} />
        <Route path='/interviewLead' element={< InterviewLead />} />
        <Route path='/addNewPerson' element={< AddNewPerson />} />
        <Route path='/hrInterViewQuestion' element={< HrInterViewQuestion />} />
        <Route path='/rolePermission' element={< RoleAndPermission />} />
        <Route path='/editRole' element={< EditRoleAndPermission />} />
        <Route path='/viewQuestionlist' element={< ViewQuestionList />} />
        <Route path='/questionAnswerSheet' element={< QuestionAnswerSheet />} />
        <Route path='/viewEmployeeInfo' element={< ViewEmployeeInfo />} />
        <Route path='/editEmployee' element={< EditEmployeeInfo />} />
        <Route path='/editPerson' element={< EditPerson />} />
        <Route path='/editAttendenceToday' element={< EditAttendence/>} />
        <Route path='/editIncompleteAttendence' element={< EditIncompleteAttendence/>} />
        <Route path='/editAttendenceReport' element={< EditAttendenceReport/>} />
        <Route path='/createRole' element={< CreateRole/>} />
        <Route path='/editLeaveRequest' element={< EditLeaveRequest/>} />
        <Route path='/editLeaveReport' element={< EditLeaveReport/>} />
        
        {/* <Route path='/unauthorizedPage' element={<UnauthorizedPage/>}/> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
