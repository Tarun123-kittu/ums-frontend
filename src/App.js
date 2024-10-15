import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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
import EditAttendence from './Components/Admin/Attendence/EditAttendence';
import CreateRole from './Components/Admin/RoleAndPermission/CreateRole';
import EditIncompleteAttendence from './Components/Admin/Attendence/EditIncompleteAttendence';
import EditAttendenceReport from './Components/Admin/Attendence/EditAttendenceReport';
import EditLeaveRequest from './Components/Admin/LeaveApplication/EditLeaveRequest';
import EditLeaveReport from './Components/Admin/LeaveApplication/EditleaveReport';
import Testseries from './Components/Admin/TestSeries/Testseries';
import ViewTestseriesQuestions from './Components/Admin/TestSeries/ViewTestSeriesQuestions';
import Leads from './Components/Admin/LeadTest/leads';
import LeadTest from './Components/Admin/LeadTest/lead-test';
import TestThankyou from './Components/Admin/LeadTest/test-thankyou';
import Sidebar from './Components/Sidebar/Sidebar';
import MarkAttendence from './Components/Admin/Attendence/MarkAttendence';
import EmployeeAttendenceReoport from './Components/Admin/Attendence/EmployeeAttendenceReoport';
import ApplyLeaves from './Components/Admin/Attendence/ApplyLeaves';
import ForgotPassword from './Components/Login/ForgotPassword';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/candidate' element={<><Sidebar /><Candidate /></>} />
        <Route path='/dashboard' element={<><Sidebar /><AdminDashboard /></>} />
        <Route path='/employee' element={<><Sidebar /><EmployeeInfo /></>} />
        <Route path='/addemployee' element={<><Sidebar /><AddnewEmployee /></>} />
        <Route path='/todayAttendence' element={<><Sidebar /><TodayAttendence /></>} />
        <Route path='incompleteAttendence' element={<><Sidebar /><IncompleteAttendence /></>} />
        <Route path='/attendenceReport' element={<><Sidebar /><AttendenceReport /></>} />
        <Route path='/leaveRequest' element={<><Sidebar /><LeaveRequest /></>} />
        <Route path='/leaveBank' element={<><Sidebar /><LeaveBank /></>} />
        <Route path='/leaveReport' element={<><Sidebar /><LeaveReport /></>} />
        <Route path='/holiday' element={<><Sidebar />< HolidayEvent /></>} />
        <Route path='/interviewLead' element={<><Sidebar />< InterviewLead /></>} />
        <Route path='/addNewPerson' element={<><Sidebar />< AddNewPerson /></>} />
        <Route path='/hrInterViewQuestion' element={<><Sidebar />< HrInterViewQuestion /></>} />
        <Route path='/rolePermission' element={<><Sidebar />< RoleAndPermission /></>} />
        <Route path='/editRole' element={<><Sidebar />< EditRoleAndPermission /></>} />
        <Route path='/viewQuestionlist' element={<><Sidebar />< ViewQuestionList /></>} />
        <Route path='/questionAnswerSheet' element={<><Sidebar />< QuestionAnswerSheet /></>} />
        <Route path='/viewEmployeeInfo' element={<><Sidebar />< ViewEmployeeInfo /></>} />
        <Route path='/editEmployee' element={<><Sidebar />< EditEmployeeInfo /></>} />
        <Route path='/editPerson' element={<><Sidebar />< EditPerson /></>} />
        <Route path='/editAttendenceToday' element={<><Sidebar />< EditAttendence /></>} />
        <Route path='/editIncompleteAttendence' element={<><Sidebar />< EditIncompleteAttendence /></>} />
        <Route path='/editAttendenceReport' element={<><Sidebar />< EditAttendenceReport /></>} />
        <Route path='/createRole' element={<><Sidebar />< CreateRole /></>} />
        <Route path='/editLeaveRequest' element={<><Sidebar />< EditLeaveRequest /></>} />
        <Route path='/editLeaveReport' element={<><Sidebar />< EditLeaveReport /></>} />
        <Route path='/testSeries' element={<><Sidebar /><Testseries /></>} />
        <Route path='/viewTestSeriesQuestion' element={<><Sidebar /><ViewTestseriesQuestions /></>} />
        <Route path='/leads/technical-round/:lead_id/:token' element={<Leads />} />
        <Route path='/lead-test/:is_open/:name/:lead_id/:token' element={<LeadTest />} />
        <Route path='/test-thankyou' element={<TestThankyou />} />
        <Route path='/mark-attendence' element={<MarkAttendence />} />
        <Route path='/employee-attendence-report' element={<EmployeeAttendenceReoport />} />
        <Route path='/apply-leaves' element={<ApplyLeaves />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        {/* <Route path='/unauthorizedPage' element={<UnauthorizedPage/>}/> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
