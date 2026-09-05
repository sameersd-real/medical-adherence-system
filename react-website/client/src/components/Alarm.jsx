import { useState } from 'react';
import './Alarm.css';
function Alarm() {
  const [alarmTime, setAlarmTime] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [tabletCount, setTabletCount] = useState(1);
  const [medicine, setMedicine] = useState('');

  const saveAlarm = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      alert('Please login first');
      return;
    }

    if (!medicine || !alarmTime || !tabletCount) {
      alert('Please fill all alarm details');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/alarms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          medicine,
          time: alarmTime,
          tablets: Number(tabletCount)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setEnabled(true);
      console.log('Alarm saved:', data);
      alert('Alarm saved!');
    } catch (error) {
      console.error(error);
      alert('Unable to connect to server');
    }
  };

  const toggleAlarm = () => {
    if (enabled) {
      setEnabled(false);
    } else {
      saveAlarm();
    }
  };

  return (
    <div className="alarm">
      <h2>Alarm</h2>

      <input
        type="text"
        className='tablet-name'
        placeholder="Medicine name"
        value={medicine}
        onChange={(e) => setMedicine(e.target.value)}
      />

      <input
        type="time"
        value={alarmTime}
        onChange={(e) => setAlarmTime(e.target.value)}
      />
      <input
        type="number"
        min="1"
        className="tablet-count"
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

      <button onClick={toggleAlarm}>
        {enabled ? 'OFF' : 'ON'}
      </button>
    </div>
  );
}

export default Alarm;