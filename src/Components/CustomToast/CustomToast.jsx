import React, { useEffect, useState } from "react";
import "./toast.css";
import { IoClose } from "react-icons/io5";
const CustomToast = ({ setShow, type = "success", message }) => {
  const [animationState, setAnimationState] = useState("show");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationState("hide");
    }, 2000);

    const closeToast = setTimeout(() => {
      setShow(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeToast);
    };
  }, [setShow]);

  return (
    <div className="toast_container">
      <div
        className={`${animationState} toast_outer ${
          type === "success" ? "success_bg" : "error_bg"
        }`}
      >
        <div
          className={`${
            type === "success" ? "success_border" : "error_border"
          } toast_content_outer `}
        >
          <div className="d-flex justify-content-between">
            <h2 className={type === "success" ? "success_text" : "error_text"}>
              Success
            </h2>
            <IoClose
              className="cursor_pointer"
              onClick={() => {
                setAnimationState("hide");
                setTimeout(() => setShow(false), 1000);
              }}
            />
          </div>

          <h3 className="mb-0">{message}</h3>
        </div>
      </div>
    </div>
  );
};

export default CustomToast;
