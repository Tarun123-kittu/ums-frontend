import React from 'react'
import profile_img from "../../assets/userpic.svg"
import { IoMdNotificationsOutline } from 'react-icons/io'
import "./notification.css"

const Notification = () => {

  return (
    <section className='notification_outer'>
    <div>
    <IoMdNotificationsOutline />
    <img src={profile_img} height={"50px"} width={"50px"}/>
    </div>

    </section>
  )

}

export default Notification