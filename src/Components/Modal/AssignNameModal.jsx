import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "../Common/Select";
import { useSelector, useDispatch } from "react-redux";
import { assigned_role } from "../../utils/redux/rolesAndPermissionSlice/assignedRoleToUser";
import { get_users_assigned_to_role } from "../../utils/redux/rolesAndPermissionSlice/getUserAssignedToRole";
import CustomSelectComp from "../Common/CustomSelectComp";

const AssignNameModal = ({
  show,
  setShow,
  dialogClassname,
  setName_assigned,
  setUser_ids,
  userAssignedToOldRole,
  role_id,
}) => {
  const dispatch = useDispatch();
  const all_userNames = useSelector((store) => store.ALL_USERNAMES);
  const [userName, setUsername] = useState([]);
  const is_user_assigned = useSelector((store) => store.ASSIGNED_ROLE);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    let name_container = [];
    if (all_userNames?.isSuccess) {
      all_userNames?.data?.data?.map((name, i) => {
        name_container.push({ value: name?.id, label: name?.username });
      });
    }
    setUsername(name_container);
  }, [all_userNames]);

  const handleUpdateUserIds = (e) => {
    if (userAssignedToOldRole) {
      dispatch(
        assigned_role({ role_id: role_id, user_id: e.value * 1 })
      );
    } else {
      const newUserId = e.value * 1;
      setUser_ids((prevUserIds) => [...prevUserIds, newUserId]);
    }
  };

  useEffect(() => {
    if (is_user_assigned?.isSuccess) {
      dispatch(get_users_assigned_to_role({ role_id: role_id }));
    }
  }, [is_user_assigned]);

  return (
    <div className="common_delete_modal_outer">
      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter Invite_candidate_modal"
        centered
        onHide={handleClose}
        className="custom_modal_container"
        dialogClassName={dialogClassname}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3 className="heading"> Assigned Names</h3>
          {/* <Select
            labelname={"Assigned Names"}
            placeholder={"Enter Name"}
            labelClass={"new_employee_form_group"}
            options={userName}
            onChange={(e) => handleUpdateUserIds(e)}
          /> */}
           <div className='form-group new_employee_form_group'>
            <label>Assigned Names</label>
             <div className='mt-2'>
             <CustomSelectComp  placeholder={"Enter Name"} changeHandler={(e) => handleUpdateUserIds(e)}   optionsData={userName}/>
             </div>
             </div>

        </Modal.Body>
        <Modal.Footer className="justify-content-center gap-3">
          <button
            className="cmn_darkgray_btn cmn_Button_style"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className="cmn_Button_style" onClick={() => setShow(false)}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AssignNameModal;
