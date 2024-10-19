import React, { useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import "./employee.css";

import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import EmployeeList from "./EmployeeList";
import { useNavigate } from "react-router-dom";
import { UsePermissions } from "../../Utils/customHooks/useAllPermissions";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";

const EmployeeInfo = () => {
  const navigate = useNavigate();
  const { show } = useAppContext();
  const permissions = UsePermissions("Users");
  const obj = [{ name: "Employees", path: "/employee" }];

  return (
    <section className="employee_outer_container">
      <Sidebar />
      <div
        className={` gray_bg admin_outer ${show ? "cmn_margin" : ""}`}
      >
        <Notification />

        <div className="employee_wrapper cmn_padding_outer">
          <BreadcrumbComp
            data={obj}
            classname={"inter_fontfamily employee_heading"}
          />
          {permissions?.can_view ? <EmployeeList /> : <UnauthorizedPage />}
        </div>
      </div>
    </section>
  );
};

export default EmployeeInfo;
