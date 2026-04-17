import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_all_usernames } from "../../../utils/redux/userSlice/getAllUserName";

const UseAllUsernames = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_all_usernames())
    }, [dispatch])

    return null;
}

export default UseAllUsernames