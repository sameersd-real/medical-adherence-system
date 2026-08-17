import AlarmContainer from "./AlarmContainer";
import Navbar from "./Navbar";
import "./Dashboard.css";
export default function Dashboard(){
    return(
        <div className="Dashboard">
            <Navbar name="Sameer" phno="9090909090" />
            <AlarmContainer />
        </div>
    );
}