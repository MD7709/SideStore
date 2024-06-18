import React from "react";
import "./Appointment.css";
import { BiUser } from "react-icons/bi";
import user from "../assets/User.svg";
import StartTime from "../assets/StartTime.gif";
import EndTime from "../assets/EndTime.gif";
import Money from "../assets/Money.gif";
import Stylist from "../assets/Stylist.png";
import Custmoertype from "../assets/Custmoertype.png";
import { faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";

const Appointment = ({ appointment }) => {
  return (
    <>
      <div className="appointment-card">
        <div className="header">
          <h2>{appointment.serviceName}</h2>
          <span className={`status ${appointment.status}`}>
            {appointment.status}
          </span>
        </div>

        <div className="username">
          <div className="user-icon">
            <img src={user} alt="user" />
          </div>
          <div className="user-name">{appointment.username}</div>
        </div>

        <div className="Time">
          <div className="Start-time">
            <img src={StartTime} alt="StartTime" />
            <p>{appointment.startTime}</p>
          </div>
          <div className="end-time">
            <img src={EndTime} alt="EndTime" />
            {appointment.endTime}
          </div>
        </div>

        <div className="stylist_main">
          <div className="stylist">
            <img src={Stylist} alt="" />
            {appointment.stylist}
          </div>
          <div className="New-user">
            <img src={Custmoertype} alt="" />
            {appointment.customerType}
          </div>
        </div>
        <div className="footer">
          <div className="Money">
            <img src={Money} alt="Rupess" />₹ {appointment.paidAmount}
          </div>
          <div>
            <button className="add-on-services">Add on services</button>
          </div>
        </div>
        <div className="payment_main">
          <div className="payment"></div>
        </div>
        <div className="end-service">
          <button className="end-service_btn">
            End service & add customer info
          </button>
        </div>
        <div className="actions">
          <button className="review">Review</button>
          <button className="cancel-service">Cancel service</button>
        </div>
        
      </div>
    </>
  );
};

export default Appointment;
