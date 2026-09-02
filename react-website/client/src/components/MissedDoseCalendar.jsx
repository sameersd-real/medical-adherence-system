import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import "./missedDose.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getMonday(date) {
  const result = new Date(date);
  const day = result.getDay();

  // Sunday = 0, Monday = 1
  const diff = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);

  return result;
}

function getWeekDates(startDate) {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  });
}

function formatTime(time) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(`1970-01-01T${time}:00`));
}

function formatWeekRange(startDate, endDate) {
  const start = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(startDate);

  const end = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(endDate);

  return `${start} – ${end}`;
}

export default function MissedDoseCalendar() {
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
  const [doses, setDoses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const weekDates = getWeekDates(weekStart);
  const weekEnd = weekDates[6];

  useEffect(() => {
    const start = formatDate(weekStart);
    const end = formatDate(weekEnd);

    setLoading(true);
    setError("");

    fetch(`${API_URL}/api/missed-doses?start=${start}&end=${end}`)
      .then((response) =>
        response.ok ? response.json() : Promise.reject()
      )
      .then(setDoses)
      .catch(() => {
        setDoses([]);
        setError(
          "Unable to load missed doses. Can't connect to server."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [weekStart]);

  const dosesByDate = doses.reduce((groups, dose) => {
    (groups[dose.scheduledDate] ||= []).push(dose);
    return groups;
  }, {});

  function changeWeek(amount) {
    setWeekStart((current) => {
      const next = new Date(current);
      next.setDate(next.getDate() + amount * 7);
      return next;
    });
  }

  function goToToday() {
    setWeekStart(getMonday(new Date()));
  }

  return (
    <main className="missed-calendar">
      <div className="missed-calendar__topbar">
        <Link to="/dashboard" className="missed-calendar__back">
          <ArrowLeft size={18} aria-hidden="true" />
          Back to dashboard
        </Link>
      </div>

      <section
        className="missed-calendar__content"
        aria-labelledby="calendar-title"
      >
        <div className="missed-calendar__heading">
          <div>
            <p className="missed-dose__eyebrow">Medication history</p>

            <h1 id="calendar-title">Missed doses</h1>

            <p>{formatWeekRange(weekStart, weekEnd)}</p>
          </div>

          <CalendarDays aria-hidden="true" />
        </div>

        <div className="missed-calendar__navigation">
          <button
            type="button"
            onClick={() => changeWeek(-1)}
            aria-label="Previous week"
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <button type="button" onClick={goToToday}>
            Today
          </button>

          <button
            type="button"
            onClick={() => changeWeek(1)}
            aria-label="Next week"
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>

        {error && <p className="missed-dose__empty">{error}</p>}

        {loading && !error && (
          <p className="missed-dose__empty">Loading missed doses...</p>
        )}

        <div className="missed-calendar__grid">
          {weekDates.map((date) => {
            const dateString = formatDate(date);
            const dayDoses = dosesByDate[dateString] || [];

            const weekday = new Intl.DateTimeFormat("en-US", {
              weekday: "short",
            }).format(date);

            return (
              <article className="calendar-day" key={dateString}>
                <header>
                  <span>{weekday}</span>
                  <strong>{date.getDate()}</strong>
                </header>

                {dayDoses.length ? (
                  dayDoses.map((dose) => (
                    <div className="calendar-dose" key={dose._id}>
                      <strong>{dose.medicine}</strong>

                      <span>
                        {dose.dosage} · Missed{" "}
                        {formatTime(dose.scheduledTime)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="calendar-day__empty">
                    No missed doses
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
