import React from 'react'
import "./employeeDashboard.css"

const Alert = () => {
    return (
        <div>
            <div className="alert-pop-up row">
                <div className="col-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                        <rect width="44.25" height="44.25" rx="22.125" fill="#FF0000"></rect>
                        <path d="M16.7555 16.6383C18.5129 13.4276 19.3917 11.8223 20.5514 11.3081C21.4779 10.8973 22.5221 10.8973 23.4486 11.3081C24.6083 11.8223 25.4871 13.4276 27.2445 16.6383L31.5034 24.4189C33.2609 27.6295 34.1396 29.2349 33.9819 30.5513C33.856 31.603 33.3338 32.5569 32.5333 33.1977C31.5313 34 29.7738 34 26.2589 34H17.7411C14.2262 34 12.4687 34 11.4667 33.1977C10.6662 32.5569 10.144 31.603 10.0181 30.5513C9.86039 29.2349 10.7391 27.6295 12.4966 24.4189L16.7555 16.6383Z" fill="white"></path>
                        <rect x="20.5474" y="16.1406" width="2.90435" height="10.7046" rx="1.45218" fill="#FF0000"></rect>
                        <rect x="20.5474" y="28.9199" width="2.90435" height="2.90435" rx="1.45218" fill="#FF0000"></rect>
                    </svg>
                </div>
                <div className="col alert-text">
                    <h3 nameclassName="">Alert!</h3>
                    <p>You have already arrived late three times this month; if you arrive late a fourth time, Ms. HR will take half a day off your leave. Be Punctual Tomorrow.</p>
                </div>
                <div className="close-alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7.75732 7.75781L16.2426 16.2431" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M7.75739 16.2431L16.2427 7.75781" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Alert