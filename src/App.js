import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ProtectedRoute from './Components/Utils/verifyToken';

import Login from "../src/Components/Login/Login";
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
import ChangePassword from './Components/Login/ChangePassword';
import ResetPassword from './Components/Login/ReserPassword';
import Test from './Components/Breadcrumb/Test';
function App() {
  const secureComponent = (Component) => <ProtectedRoute element={() => <><Sidebar /><Component /></>} />;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route path='/candidate' element={secureComponent(Candidate)} />
        <Route path='/dashboard' element={secureComponent(AdminDashboard)} />
        <Route path='/employee' element={secureComponent(EmployeeInfo)} />
        <Route path='/addemployee' element={secureComponent(AddnewEmployee)} />
        <Route path='/todayAttendence' element={secureComponent(TodayAttendence)} />
        <Route path='/incompleteAttendence' element={secureComponent(IncompleteAttendence)} />
        <Route path='/attendenceReport' element={secureComponent(AttendenceReport)} />
        <Route path='/leaveRequest' element={secureComponent(LeaveRequest)} />
        <Route path='/leaveBank' element={secureComponent(LeaveBank)} />
        <Route path='/leaveReport' element={secureComponent(LeaveReport)} />
        <Route path='/holiday' element={secureComponent(HolidayEvent)} />
        <Route path='/interviewLead' element={secureComponent(InterviewLead)} />
        <Route path='/addNewPerson' element={secureComponent(AddNewPerson)} />
        <Route path='/hrInterViewQuestion' element={secureComponent(HrInterViewQuestion)} />
        <Route path='/rolePermission' element={secureComponent(RoleAndPermission)} />
        <Route path='/editRole' element={secureComponent(EditRoleAndPermission)} />
        <Route path='/viewQuestionlist' element={secureComponent(ViewQuestionList)} />
        <Route path='/questionAnswerSheet' element={secureComponent(QuestionAnswerSheet)} />
        <Route path='/viewEmployeeInfo' element={secureComponent(ViewEmployeeInfo)} />
        <Route path='/editEmployee' element={secureComponent(EditEmployeeInfo)} />
        <Route path='/editPerson' element={secureComponent(EditPerson)} />
        <Route path='/editAttendenceToday' element={secureComponent(EditAttendence)} />
        <Route path='/editIncompleteAttendence' element={secureComponent(EditIncompleteAttendence)} />
        <Route path='/editAttendenceReport' element={secureComponent(EditAttendenceReport)} />
        <Route path='/createRole' element={secureComponent(CreateRole)} />
        <Route path='/editLeaveRequest' element={secureComponent(EditLeaveRequest)} />
        <Route path='/editLeaveReport' element={secureComponent(EditLeaveReport)} />
        <Route path='/testSeries' element={secureComponent(Testseries)} />
        <Route path='/viewTestSeriesQuestion' element={secureComponent(ViewTestseriesQuestions)} />
        <Route path='/leads/technical-round/:lead_id/:token' element={<Leads />} />
        <Route path='/lead-test/:is_open/:name/:lead_id/:token' element={<LeadTest />} />
        <Route path='/test-thankyou' element={<TestThankyou />} />
        <Route path='/mark-attendence' element={secureComponent(MarkAttendence)} />
        <Route path='/employee-attendence-report' element={secureComponent(EmployeeAttendenceReoport)} />
        <Route path='/apply-leaves' element={secureComponent(ApplyLeaves)} />
        <Route path='/change-password' element={secureComponent(ChangePassword)} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset_password/:token" element={<ResetPassword />} />
        <Route path="/test" element={<Test />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
