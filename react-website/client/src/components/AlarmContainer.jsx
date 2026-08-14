import Alarm from "./Alarm";
import "./AlarmContainer.css";

export default function AlarmContainer() {
  return (
    <div className="alarm-container">
      <Alarm />
      <Alarm />
      <Alarm />
    </div>
  );
}