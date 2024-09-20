import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_all_applied_leaves } from "../../../utils/redux/leaveSlice/getAllAppliedLeaves";

const UseFetchAllAppliedLeaves = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_all_applied_leaves())
    }, [dispatch])

    return null
}

export default UseFetchAllAppliedLeaves