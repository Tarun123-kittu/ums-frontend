import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_all_applied_leaves } from "../../../utils/redux/leaveSlice/getAllAppliedLeaves";

const UseFetchAllAppliedLeaves = ({ page }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_all_applied_leaves({ page }))
    }, [dispatch])

    return null
}

export default UseFetchAllAppliedLeaves