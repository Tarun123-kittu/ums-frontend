import { useEffect } from "react";

const UseInterviewCount = () => {
    useEffect(() => {
        const fetchInterviewCount = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };

                const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_all_interviews`, requestOptions);
                if (!response.ok) {
                    const errorMessage = await response.json();
                    if (errorMessage) {
                        throw new Error(errorMessage.message);
                    }
                }

                const result = await response.json();
                console.log(result, "this is the result")
                return result;
            } catch (error) {
                console.error("Error fetching interviews:", error);
                return {
                    message: error.message,
                };
            }
        };

        fetchInterviewCount();
    }, []);

    return null;
}

export default UseInterviewCount;
