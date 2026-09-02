import AlarmContainer from "./AlarmContainer";
import MissedDose from "./missedDose";
import Navbar from "./Navbar";
import "./Dashboard.css";
export default function Dashboard(){
    return(
        <div className="Dashboard">
            <Navbar name="Sameer" phno="9090909090" />
            <AlarmContainer />
            <MissedDose />
        </div>
    );
}
