import { useEffect, useState } from "react";
import Alarm from "./Alarm";
import "./AlarmContainer.css";
function AlarmContainer() {
    const [alarms, setAlarms] = useState([]);

    useEffect(() => {
        const fetchAlarms = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;
            try {
                const response = await fetch(
                    `http://localhost:5000/api/alarms/${user.id}`
                );
                const data = await response.json();
                if (response.ok) {
                    setAlarms(data);
                }
            } catch (error) {
                console.error("Failed to fetch alarms:", error);
            }
        };
        fetchAlarms();
    }, []);
    return (
        <div className="alarm-container">
            {[0, 1, 2].map((index) => (
                <Alarm
                    key={index}
                    alarm={alarms[index] || null}
                />  
            ))}
        </div>
    );
}

export default AlarmContainer;