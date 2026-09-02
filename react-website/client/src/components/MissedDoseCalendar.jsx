import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import "./missedDose.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const weekDates = ["2026-08-31", "2026-09-01", "2026-09-02", "2026-09-03", "2026-09-04", "2026-09-05", "2026-09-06"];

function formatTime(time) {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" })
    .format(new Date(`1970-01-01T${time}:00`));
}

export default function MissedDoseCalendar() {
  const [doses, setDoses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/missed-doses?start=${weekDates[0]}&end=${weekDates.at(-1)}`)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then(setDoses)
      .catch(() => setError("Unable to load missed doses. Start the backend and seed the test data."));
  }, []);

  const dosesByDate = doses.reduce((groups, dose) => {
    (groups[dose.scheduledDate] ||= []).push(dose);
    return groups;
  }, {});

  return (
    <main className="missed-calendar">
      <div className="missed-calendar__topbar">
        <Link to="/dashboard" className="missed-calendar__back">
          <ArrowLeft size={18} aria-hidden="true" /> Back to dashboard
        </Link>
      </div>

      <section className="missed-calendar__content" aria-labelledby="calendar-title">
        <div className="missed-calendar__heading">
          <div>
            <p className="missed-dose__eyebrow">Medication history</p>
            <h1 id="calendar-title">Missed doses</h1>
            <p>Week of August 31 – September 6</p>
          </div>
          <CalendarDays aria-hidden="true" />
        </div>

        {error && <p className="missed-dose__empty">{error}</p>}
        <div className="missed-calendar__grid">
          {weekDates.map((date) => {
            const dayDate = new Date(`${date}T00:00:00`);
            const dayDoses = dosesByDate[date] || [];
            return <article className="calendar-day" key={date}>
              <header>
                <span>{new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(dayDate)}</span>
                <strong>{dayDate.getDate()}</strong>
              </header>
              {dayDoses.length ? dayDoses.map((dose) => (
                <div className="calendar-dose" key={dose._id}>
                  <strong>{dose.medicine}</strong>
                  <span>{dose.dosage} · Missed {formatTime(dose.scheduledTime)}</span>
                </div>
              )) : <p className="calendar-day__empty">No missed doses</p>}
            </article>;
          })}
        </div>
      </section>
    </main>
  );
}
