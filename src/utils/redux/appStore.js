import { configureStore } from '@reduxjs/toolkit'
import getAllUsers from './userSlice/getAllUserSlice'
import createNewUser from './userSlice/createNewUserSlice'
import deleteUser from './userSlice/deleteUserSlice'
import Login from './loginSlice/loginSlice'
import getLoggedInUserPermissions from './userPermissionSlice/userpermissionSlice'
import userPermissionHandler from './userPermissionSlice/userRolesAndPermissionSlice'
import getUserDetails from './userSlice/userDetailsSlice'
import updateUser from './userSlice/updateUserSlice'
import getAttendanceReport from './attendanceSlice/getTodayAttendance'
import getUserAttendanceReport from './attendanceSlice/getAttendanceRepot'
import getAllAppliedLeaves from './leaveSlice/getAllAppliedLeaves'
import getAllUserRoles from './rolesAndPermissionSlice/getUserRolesSlice'
import getRolePermissions from './rolesAndPermissionSlice/getRolePermissions'
import updateRolePermission from './rolesAndPermissionSlice/updateRolePermission'
import disableRole from './rolesAndPermissionSlice/deleteRole'
import createNewRoleAndAssignPermissions from './rolesAndPermissionSlice/createNewRole'
import getAllUsername from './userSlice/getAllUserName'
import getUsersAssignedToRoles from './rolesAndPermissionSlice/getUserAssignedToRole'
import deleteUserAssignedToRole from './rolesAndPermissionSlice/deleteUserAssignedToRole'
import assignedRole from './rolesAndPermissionSlice/assignedRoleToUser'
import getAppliedLeaveDetail from './leaveSlice/getAppliedLeavesDetails'
import updateLeave from './leaveSlice/updateLeaves'
import getAllUserLeave from './leaveSlice/getUsersAllLeaves'
import getLeaveBankReport from './leaveSlice/getLeaveBankReport'
import addHolidayAndEvent from './holidayAndEventsSlice/addHolidayAndEvent'
import getAllHolidaysAndEvents from './holidayAndEventsSlice/getAllHolidaysAndEvents'
import getSelectedHolidayAndEventDetails from './holidayAndEventsSlice/getSelectedHolidayAndEvent'
import updateSelectedEvents from './holidayAndEventsSlice/updateHolidayAndEvents'
import deleteEvent from './holidayAndEventsSlice/deleteEvent'
import getSelectedAttendanceDetail from './attendanceSlice/getSelectedAttendanceDetails'
import updateAttendance from './attendanceSlice/updateAttendance'
import getAllLanguage from './testSeries/getAllLanguages'
import createTestSeries from './testSeries/createTestSeries'
import getAllSeries from './testSeries/getAllTestSeries'
import updateTestseries from './testSeries/updatTestSeries'
import getSeries from './testSeries/getSeries'
import deleteSeries from './testSeries/deleteSeries'
import createObjQuestion from './testSeries/objectiveQuestionsSlice/createObjQuestion'
import getQueAns from './testSeries/getQuestionsAnswer'
import addSubjectiveQue from './testSeries/subjectiveQue/addSubjectiveQue'
import addLogicalQue from './testSeries/logicalQuestionSlice/addLogicalQue'
import getLogicalSubjectiveQuestion from './testSeries/logicalQuestionSlice/getLogicalQuestions'
import getObjectiveQuestion from './testSeries/objectiveQuestionsSlice/getObjectiveQuestion'
import updateLogicalQue from './testSeries/logicalQuestionSlice/updateLogicalQuestion'
import updateObjQue from './testSeries/objectiveQuestionsSlice/updateObjectiveQuestion'
import deleteLogicalQue from './testSeries/logicalQuestionSlice/deleteLogicalQUestion'
import deleteObjectiveQue from './testSeries/objectiveQuestionsSlice/deleteObjectiveQuestion'
import addInterviewLeads from './interviewLeadsSlice/addLeads'
import getAllLeads from './interviewLeadsSlice/getAllLeads'
import updateLead from './interviewLeadsSlice/updateLead'
import hrRoundQuestion from './interviewLeadsSlice/hrRound/getHrRoundQuestions'
import hrRound from './interviewLeadsSlice/hrRound/hrRoundResponse'
import getHrRoundLeads from './interviewLeadsSlice/hrRound/getHrRoundCandidate'
import hrUpdateLeadStatus from './interviewLeadsSlice/hrRound/hrUpdateLeadStatus'
import hrAssinedQuestionsToLead from './interviewLeadsSlice/hrRound/getAssignedQuestionsToLead'
import updateKeypoint from './interviewLeadsSlice/hrRound/updateKeyPoints'
import getSelectedLanguageSeries from './interviewLeadsSlice/technicalRound/getAllSelectedTestSeries'
import sendTestLink from './interviewLeadsSlice/hrRound/sendTestLink'
import getAllTechLeads from './interviewLeadsSlice/technicalRound/getAllTechRoundLeads'
import updateTechStatus from './interviewLeadsSlice/technicalRound/updateTechnicalRoundStatus'
import verifyLead from './interviewLeadsSlice/technicalRound/verifyLead'
import startTest from './interviewLeadsSlice/technicalRound/startTest'
import getTestQuestions from './interviewLeadsSlice/technicalRound/getTestQuestions'
import submitTest from './interviewLeadsSlice/technicalRound/submitTest'
import getLeadAnswer from './interviewLeadsSlice/technicalRound/getLeadAnswers'
import checkLeadAnswer from './interviewLeadsSlice/technicalRound/CheckLeadAnswers'
import submitDeveloperReview from './interviewLeadsSlice/technicalRound/submitDeveloperReview'
import updateFaceRoundStatus from './interviewLeadsSlice/technicalRound/updateFaceToFaceRoundStatus'
import updateLeadRoundCount from './interviewLeadsSlice/technicalRound/updateInRoundCount'
import getFaceRoundLeads from './interviewLeadsSlice/getFaceRoundLeads'
import getFinalRoundLeads from './interviewLeadsSlice/technicalRound/getFinalRoundLeads'
import MarkAttendence from './attendanceSlice/markAttendances'
import getTodayAttendanceTime from './attendanceSlice/getUserTodayAttendaceTime'
import unmarkAttendance from './attendanceSlice/unmarkAttendance'
import getHolidayBirthdayEvent from './holidayAndEventsSlice/getAlBirthdayHolidayEvents'
import totalPresentEmployees from './attendanceSlice/presentEmployees'
import getCurrentAndNextMonthRecords from './holidayAndEventsSlice/getCurrentAndNextMonthEvents'
import getUserMonthlyAttendence from './attendanceSlice/getUserMonthlyReport'
import userPendingLeaves from './leaveSlice/getUserPendingLeaves'
import applyLeaveHandler from './leaveSlice/applyLeave'
import userAppliedLeaves from './leaveSlice/getUserAppliedLeaves'
import getAllRoles from './rolesAndPermissionSlice/getAllRoles'
import getUserDocument from './userSlice/getUserDocuments'
import getEmployeeLeaveCount from './dashboardSlice/getEmployeesOnLeave'
import getDashboardInterviewOverview from './dashboardSlice/getDashboardInterviewOverview'
import getDashboardAttendenceGraph from './dashboardSlice/getDashboardAttendenceGraph'
import getLeavesOnDashboard from './dashboardSlice/getDashboardLeave'
import updateBankLeave from './leaveSlice/updateBankLeaves'

const appStore = configureStore({
    reducer: {
        LOGIN: Login,
        GET_ALL_USERS: getAllUsers,
        CREATE_NEW_USER: createNewUser,
        DELETE_USER: deleteUser,
        USER_PERMISSIONS: getLoggedInUserPermissions,
        USER_ALL_PERMISSIONS: userPermissionHandler,
        GET_USER_DETAILS: getUserDetails,
        UPDATE_USER: updateUser,
        ATTENDANCE_REPORT: getAttendanceReport,
        GET_USER_ATTENDANCE_REPORT: getUserAttendanceReport,
        GET_ALL_APPLIED_LEAVES: getAllAppliedLeaves,
        GET_ALL_USER_ROLES: getAllUserRoles,
        GET_ROLE_PERMISSIONS: getRolePermissions,
        UPDATE_ROLE_PERMISSION: updateRolePermission,
        DISABLE_ROLE: disableRole,
        CREATE_NEW_ROLE_AND_PERMISSIONS: createNewRoleAndAssignPermissions,
        ALL_USERNAMES: getAllUsername,
        USERS_ASSIGNED_TO_ROLE: getUsersAssignedToRoles,
        DELETE_USER_ASSIGNED_TO_ROLE: deleteUserAssignedToRole,
        ASSIGNED_ROLE: assignedRole,
        APPLIED_LEAVE_DETAIL: getAppliedLeaveDetail,
        UPDATE_LEAVE: updateLeave,
        USER_ALL_LEAVES: getAllUserLeave,
        LEAVE_REPORT_BANK: getLeaveBankReport,
        ADD_HOLIDAY_AND_EVENT: addHolidayAndEvent,
        ALL_HOLIDAY_AND_EVENT: getAllHolidaysAndEvents,
        SELECTED_EVENT_DETAILS: getSelectedHolidayAndEventDetails,
        UPDATE_SELECTED_EVENT: updateSelectedEvents,
        DELETE_EVENT: deleteEvent,
        SELECTED_ATTENDANCE_DETAIL: getSelectedAttendanceDetail,
        UPDATE_ATTENDANCE: updateAttendance,
        ALL_LANGUAGES: getAllLanguage,
        CREATE_TEST_SERIES: createTestSeries,
        ALL_SERIES: getAllSeries,
        UPDATE_TESTSERIES: updateTestseries,
        GET_SERIES: getSeries,
        DELETE_SERIES: deleteSeries,
        CREATE_OBJ_QUESTION: createObjQuestion,
        ALL_QUE_ANS: getQueAns,
        SUBJECTIVE_QUE: addSubjectiveQue,
        LOGICAL_QUE: addLogicalQue,
        GET_LOGICAL_SUBJECTIVE_QUESTION: getLogicalSubjectiveQuestion,
        GET_OBJECTIVE_QUESTION: getObjectiveQuestion,
        UPDATE_LOGICAL_QUESTION: updateLogicalQue,
        UPDATE_OBJECTIVE_QUESTION: updateObjQue,
        DELETE_LOGICAL_QUE: deleteLogicalQue,
        DELETE_OBJECTIVE_QUE: deleteObjectiveQue,
        ADD_INTERVIEW_LEADS: addInterviewLeads,
        ALL_LEADS: getAllLeads,
        UPDATE_LEAD: updateLead,
        HR_ROUND_QUESTION: hrRoundQuestion,
        HR_ROUND_RESULT: hrRound,
        HR_ROUND_LEAD: getHrRoundLeads,
        HR_UPDATE_LEAD_STATUS: hrUpdateLeadStatus,
        HR_ASSIGNED_QUESTION_TO_LEAD: hrAssinedQuestionsToLead,
        UPDATE_KEY_POINT: updateKeypoint,
        SELECTED_LANGUAGE_SERIES: getSelectedLanguageSeries,
        SENT_TEST_LINK: sendTestLink,
        TECH_LEADS: getAllTechLeads,
        UPDATE_TECH_STATUS: updateTechStatus,
        VERIFY_LEAD: verifyLead,
        START_TEST: startTest,
        TEST_QUESTIONS: getTestQuestions,
        SUBMIT_TEST: submitTest,
        LEAD_ANSWER: getLeadAnswer,
        CHECK_LEAD_ANSWER: checkLeadAnswer,
        DEVELOPER_REVIEW: submitDeveloperReview,
        FACE_ROUND_STATUS: updateFaceRoundStatus,
        ROUND_COUNT: updateLeadRoundCount,
        FACE_ROUND_LEADS: getFaceRoundLeads,
        FINAL_ROUND_LEADS: getFinalRoundLeads,
        MARK_ATTENDANCE: MarkAttendence,
        TODAY_ATTENDANCE_TIME: getTodayAttendanceTime,
        UNMARK_ATTENDANCE: unmarkAttendance,
        HOLIDAY_BIRTHDAY_EVENT: getHolidayBirthdayEvent,
        PRESENT_EMPLOYEES: totalPresentEmployees,
        CURRENT_AND_NEXT_MONTH_EVENTS: getCurrentAndNextMonthRecords,
        ATTENDENCE_MONTHLY_REPORT: getUserMonthlyAttendence,
        USER_PENDING_LEAVES: userPendingLeaves,
        APPLY_LEAVE: applyLeaveHandler,
        USER_APPLIED_LEAVES: userAppliedLeaves,
        ALL_ROLES: getAllRoles,
        USER_DOCUMENT: getUserDocument,
        EMPLOYEE_LEAVE_COUNT: getEmployeeLeaveCount,
        DASHBOARD_INTERVIEWOVERVIEW: getDashboardInterviewOverview,
        DASHBOARD_ATTENDENCE_GRAPH: getDashboardAttendenceGraph,
        GET_LEAVES_ON_DASHBOARD: getLeavesOnDashboard,
        UPDATE_BANK_LEAVE: updateBankLeave
    },
})

export default appStore

