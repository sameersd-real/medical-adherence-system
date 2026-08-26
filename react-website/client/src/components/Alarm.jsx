import { useState } from 'react';
import './Alarm.css'
function Alarm() {
  const [alarmTime, setAlarmTime] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [tabletCount, setTabletCount] = useState('');
  return (
    <div className="alarm">
      <h2>Alarm</h2>
      <input
        type="time"
        value={alarmTime}
        onChange={(e) => setAlarmTime(e.target.value)}
      />
      <input
        type="number"
        min="1"
        className='tablet-count'
        placeholder="No. of tablets"
        value={tabletCount}
        onChange={(e) => setTabletCount(e.target.value)}
      />
      {enabled && alarmTime && tabletCount && (
        <p>
          Alarm set for {alarmTime} — Take {tabletCount} tablet
          {tabletCount > 1 ? 's' : ''}
        </p>
      )}
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'OFF' : 'ON'}
      </button>
    </div>
  );
}

export default Alarm;