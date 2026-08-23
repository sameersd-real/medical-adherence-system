import Alarm from "./Alarm";
import "./AlarmContainer.css";

export default function AlarmContainer() {
  const alarms = [1, 2, 3];
  return (
    <div className="alarm-container">
      {alarms.map((item) => (
        <Alarm key={item} />
      ))}
    </div>
  );
}