import React, { useState, useEffect } from 'react'
import { get_all_todo_tasks, clear_all_todo_tasks_state } from "../../../utils/redux/todoSlice/getTasksSlice"
import { useSelector, useDispatch } from "react-redux";
import NOTASK from "../../assets/noTask.svg"

const CompletedTasks = () => {
    const dispatch = useDispatch()
    const all_tasks = useSelector(((store) => store.GET_ALL_TODOS))
    console.log(all_tasks, "this is the all_tasks from completed module")
    useEffect(() => {
        dispatch(get_all_todo_tasks({ task_status: "COMPLETED" }))
    }, [])

    if (all_tasks?.isSuccess && all_tasks?.data?.message === "Currently you have no task in COMPLETED") {
        return (
            <div className='text-center p-3'>
            <img className='h-100 m-auto' src={NOTASK} alt="no tasks" />
            </div>
        )
    }

    if(all_tasks?.isLoading){
        return(
            <h5>Loading ....</h5>
        )
    }
    
    return (
        <div>
            <ul class="pt-6 list-unstyled">
                {all_tasks?.data?.data?.map((task, i) => {
                    return (
                        <li key={i} class="d-flex justify-content-between pb-3">
                            <label class="form-check-label" for="flexCheckDefault1">
                                <p className="to-do-text">{task?.task_name}</p>
                            </label>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CompletedTasks