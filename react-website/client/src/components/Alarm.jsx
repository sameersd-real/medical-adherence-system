import { useState } from 'react';
import './Alarm.css'
function Alarm() {
  const [alarmTime, setAlarmTime] = useState('');
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="alarm">
      <h2>Alarm</h2>
      <input
        type="time"
        value={alarmTime}
        onChange={(e) => setAlarmTime(e.target.value)}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'ON' : 'OFF'}
      </button>
      {enabled && alarmTime && (
        <p>Alarm set for {alarmTime}</p>
      )}
    </div>
  );
}

export default Alarm;