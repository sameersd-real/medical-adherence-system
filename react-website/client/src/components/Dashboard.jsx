import { useState } from "react";
import AlarmContainer from "./AlarmContainer";
import MissedDose from "./missedDose";
import Navbar from "./Navbar";
import "./Dashboard.css";
export default function Dashboard(){
    const user = JSON.parse(localStorage.getItem("user"));
    return(
        <div className="Dashboard">
            <Navbar name={user.name} phno={user.phone} />
            <AlarmContainer />
            <MissedDose />
        </div>
    );
}
