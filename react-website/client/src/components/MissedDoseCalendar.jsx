import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "./missedDose.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getMonday(date) {
  const result = new Date(date);
  const day = result.getDay();

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
  const [weekStart, setWeekStart] = useState(() =>
    getMonday(new Date())
  );

  const [missedDoses, setMissedDoses] = useState([]);
  const [takenDoses, setTakenDoses] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const weekDates = getWeekDates(weekStart);
  const weekEnd = weekDates[6];

  useEffect(() => {
    const start = formatDate(weekStart);
    const end = formatDate(weekEnd);

    setLoading(true);
    setError("");

    Promise.all([
      fetch(
        `${API_URL}/api/missed-doses?start=${start}&end=${end}`
      ),
      fetch(
        `${API_URL}/api/taken-doses?start=${start}&end=${end}`
      ),
    ])
      .then(async ([missedResponse, takenResponse]) => {
        if (!missedResponse.ok || !takenResponse.ok) {
          throw new Error("Failed to fetch dose history");
        }

        const missed = await missedResponse.json();
        const taken = await takenResponse.json();

        return { missed, taken };
      })
      .then(({ missed, taken }) => {
        setMissedDoses(missed);
        setTakenDoses(taken);
      })
      .catch(() => {
        setMissedDoses([]);
        setTakenDoses([]);

        setError(
          "Unable to load medication history. Can't connect to server."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [weekStart]);

  const missedByDate = missedDoses.reduce((groups, dose) => {
    (groups[dose.scheduledDate] ||= []).push(dose);
    return groups;
  }, {});

  const takenByDate = takenDoses.reduce((groups, dose) => {
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
            <p className="missed-dose__eyebrow">
              Medication history
            </p>

            <h1 id="calendar-title">Medication History</h1>

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

        {error && (
          <p className="missed-dose__empty">
            {error}
          </p>
        )}

        {loading && !error && (
          <p className="missed-dose__empty">
            Loading medication history...
          </p>
        )}

        <div className="missed-calendar__grid">
          {weekDates.map((date) => {
            const dateString = formatDate(date);

            const dayMissedDoses =
              missedByDate[dateString] || [];

            const dayTakenDoses =
              takenByDate[dateString] || [];

            const hasDoses =
              dayMissedDoses.length > 0 ||
              dayTakenDoses.length > 0;

            const weekday = new Intl.DateTimeFormat("en-US", {
              weekday: "short",
            }).format(date);

            return (
              <article
                className="calendar-day"
                key={dateString}
              >
                <header>
                  <span>{weekday}</span>
                  <strong>{date.getDate()}</strong>
                </header>

                {hasDoses ? (
                  <>
                    {/* TAKEN DOSES */}
                    {dayTakenDoses.map((dose) => (
                      <div
                        className="calendar-dose taken-dose-calendar"
                        key={`taken-${dose._id}`}
                      >
                        <div>
                          <CheckCircle
                            size={16}
                            aria-hidden="true"
                          />

                          <strong>{dose.medicine}</strong>
                        </div>

                        <span>
                          {dose.dosage} · Taken{" "}
                          {formatTime(dose.takenTime)}
                        </span>
                      </div>
                    ))}

                    {/* MISSED DOSES */}
                    {dayMissedDoses.map((dose) => (
                      <div
                        className="calendar-dose missed-dose-calendar"
                        key={`missed-${dose._id}`}
                      >
                        <div>
                          <AlertCircle
                            size={16}
                            aria-hidden="true"
                          />

                          <strong>{dose.medicine}</strong>
                        </div>

                        <span>
                          {dose.dosage} · Missed{" "}
                          {formatTime(dose.scheduledTime)}
                        </span>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="calendar-day__empty">
                    No medication records
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
