import React, { useState, useEffect } from 'react';
import './employeeDashboard.css'
import { add_todo_task, clear_add_todo_task_state } from "../../../utils/redux/todoSlice/addTodoSlice"
import { get_all_todo_tasks, clear_all_todo_tasks_state } from "../../../utils/redux/todoSlice/getTasksSlice"
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import ActiveTasks from "./ActiveTasks"
import CompletedTasks from "./CompletedTasks"
import { shift_task, clear_shift_task_state } from "../../../utils/redux/todoSlice/shiftTaskSlice"


function EmployeeTodoList() {
    const dispatch = useDispatch()
    const [task, setTask] = useState("")
    const [currentTab, setCurrentTab] = useState("ACTIVE")
    const [completed, setCompleted] = useState(false)
    const [task_id_array, setTask_id_array] = useState([])
    const is_task_saved = useSelector(((store) => store.ADD_TODO_TASK))
    const is_task_shifted = useSelector(((store) => store.SHIFT_TASK))

    const handleSaveTask = () => {
        if (task === "") {
            toast.error("Please enter your task")
            return
        }

        dispatch(add_todo_task({ task_name: task }))
    }

    useEffect(() => {
        if (is_task_saved?.isSuccess) {
            toast.success(is_task_saved?.message?.message)
            dispatch(clear_add_todo_task_state())
            setTask("")
            dispatch(get_all_todo_tasks({ task_status: "ACTIVE" }))
        }
        if (is_task_saved?.isError) {
            toast.error(is_task_saved?.error?.message)
            dispatch(clear_add_todo_task_state())
        }
    }, [is_task_saved])

    const handleShictTasks = () => {
        if (task_id_array?.length > 0) {
            dispatch(shift_task({ task_status: "COMPLETED", tasks_ids: task_id_array }))
        }
    }

    useEffect(() => {
        if (is_task_shifted?.isSuccess) {
            toast.success(is_task_shifted?.message?.message)
            dispatch(get_all_todo_tasks({ task_status: "ACTIVE" }))
            dispatch(clear_shift_task_state())
        }
        if (is_task_shifted?.isError) {
            toast.error(is_task_shifted?.error?.message)
            dispatch(clear_shift_task_state())
        }
    }, [is_task_shifted])
    return (
        <div class="">

            <div class="d-flex justify-content-between pb-2">
                <h3 className="heading-h3">
                    To-Do List
                </h3>
                <div class="d-flex mr-4">
                    <div class="mr-4">
                        <button onClick={() => setCurrentTab("ACTIVE")} type="button" class="btn btn-danger btn-sm px-4 py-2 text-white rounded-pill">Active</button>
                    </div>
                    <div>
                        <button onClick={() => setCurrentTab("COMPLETE")} type="button" class="btn btn-outline-danger btn-sm px-4 py-2 text-danger rounded-pill">Completed</button>
                    </div>
                </div>
            </div>

            {currentTab === "ACTIVE" ? <ActiveTasks setCompleted={setCompleted} setTask_id_array={setTask_id_array} />
                :
                <CompletedTasks />}


            {currentTab === "ACTIVE" && <div>
                <div class="mb-4">
                    <textarea rows="2" class=" to-do-input form-control" id="exampleFormControlTextarea1" placeholder="Enter your to-do task..." value={task} onChange={(e) => setTask(e.target.value)}></textarea>
                </div>

                <div class="">
                    <div class="d-flex justify-content-end ">

                        <button type="button" class="all-btn-black" onClick={() => { setTask(""); setCompleted(false); }}>Cancel</button>
                        {!completed ? <button type="button" class="all-btn-red" onClick={() => handleSaveTask()}> Save</button>
                            :
                            <button type="button" class="all-btn-red" onClick={() => handleShictTasks()}>Mark Complete</button>}

                    </div>
                </div>
            </div>}
        </div>

    );
}

export default EmployeeTodoList;
