import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import "./missedDose.css";

const weekDays = [
  { day: "Mon", date: "31", doses: [{ medicine: "Amlodipine", time: "8:00 AM" }] },
  { day: "Tue", date: "1", doses: [] },
  { day: "Wed", date: "2", doses: [{ medicine: "Metformin", time: "8:00 AM" }] },
  { day: "Thu", date: "3", doses: [] },
  { day: "Fri", date: "4", doses: [] },
  { day: "Sat", date: "5", doses: [] },
  { day: "Sun", date: "6", doses: [{ medicine: "Vitamin D3", time: "9:00 PM" }] },
];

export default function MissedDoseCalendar() {
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

        <div className="missed-calendar__grid">
          {weekDays.map(({ day, date, doses }) => (
            <article className="calendar-day" key={day}>
              <header>
                <span>{day}</span>
                <strong>{date}</strong>
              </header>
              {doses.length ? doses.map((dose) => (
                <div className="calendar-dose" key={dose.medicine}>
                  <strong>{dose.medicine}</strong>
                  <span>Missed · {dose.time}</span>
                </div>
              )) : <p className="calendar-day__empty">No missed doses</p>}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
