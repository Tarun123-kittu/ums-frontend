import React from 'react'
import Notification from "../Notification/Notification";
import { useAppContext } from "../../Utils/appContecxt";
import './CandidateList.css'
const CandidateList = () => {
    const { show } = useAppContext();
    return (
        <section className="test_serie_wrapper">
            <div
                className={`${localStorage.getItem("roles")?.includes("Employee") ? "" : "wrapper "
                    } gray_bg admin_outer ${show ? "cmn_margin" : ""}`}
            >
                <Notification />

                <div className="cmn_padding_outer">
                    <div className='row row-gap-3'>
                    {[...Array(5)].map((_, index) => (
                        <div className="col-lg-3" key={index}>
                            <div className='candidate_list'>
                                <ul>
                                    <li>Fresher</li>
                                    <li>Php</li>
                                    <li>1 Hours</li>
                                </ul>
                                <h3>Aman Rana</h3>
                                <p>In publishing and graphic design, Lorem ipsum is a placeholder text without relying on meaningful content. </p>
                                <button className='cmn_Button_style w-100'>View Answers</button>

                            </div>
                        </div>
))}
                        </div>    
                </div>
            </div>
        </section>
    )
}

export default CandidateList