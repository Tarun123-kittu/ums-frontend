import attendenceIcon from "../assets/attendence.svg"
import calendar from "../assets/calendar.svg"
import leaveApplication from "../assets/leaveApplication.svg"
import testSeries from "../assets/testSeries.svg"

import interviewLead from "../assets/interviewLead.svg"
import teamAndRole from "../assets/people.svg"
import employeeIcon from "../assets/employeeIcon.svg"

const menuitems=[
  {
    icon:calendar,
    name:"Dashboard",
    pathname:"/dashboard"
    },
    {
      icon:employeeIcon,
      name:"Employees",
      pathname:"/employee"
      },
{
icon:attendenceIcon,
name:"Attendance Report",
pathname:"/logout",
subItems: [
  { name: "Attendance Today", pathname: "/todayAttendence" },
  { name: "Attendance Report", pathname: "/attendenceReport" },
  { name: "Incomplete Attendance", pathname: "/incompleteAttendence" },
],
},
{
icon:calendar,
name:"Holiday & Events",
pathname:"/holiday"
},
{
icon:leaveApplication,
name:"Leave Application",
pathname:"/logout",
subItems: [
    { name: "Leave Request", pathname: "/leaveRequest" },
    { name: "Leave Bank", pathname: "/leaveBank" },
    { name: "Leave Report", pathname: "/leaveReport" },
  ],
},
{
icon:interviewLead,
name:"InterView Leads",
pathname:"/interviewLead"
},
{
icon:testSeries,
name:"Test Series",
pathname:"/testSeries"
},
{
icon:teamAndRole,
name:"Teams & Roles",
pathname:"/rolePermission"
},

]

export const hrMenuitems=[
{
icon:calendar,
name:"Candidates",
pathname:"/candidates"
},
{
icon:employeeIcon,
name:"Team Hub",
pathname:"/teamHub"
},
{
  icon:calendar,
  name:"HR Screening",
  pathname:"/hrScreening"
  },
{
icon:calendar,
name:"HR Round",
pathname:"/hrRound"
},
]

export const developerMenuitems=[
  {
  icon:calendar,
  name:"Questionnaire",
  pathname:"/questionnaire"
  },
  {
  icon:employeeIcon,
  name:"Candidate Results",
  pathname:"/candidateResults"
  },
   
  ]
export default menuitems