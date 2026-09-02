import { Link } from "react-router-dom";
import { AlertCircle, ChevronRight } from "lucide-react";
import "./missedDose.css";

const missedDoses = [
  { medicine: "Metformin", dosage: "500 mg", time: "8:00 AM", day: "Today" },
  { medicine: "Vitamin D3", dosage: "1,000 IU", time: "9:00 PM", day: "Yesterday" },
  { medicine: "Amlodipine", dosage: "5 mg", time: "8:00 AM", day: "Mon, Aug 31" },
];

export default function MissedDose() {
  return (
    <section className="missed-dose" aria-labelledby="missed-dose-title">
      <div className="missed-dose__header">
        <div>
          <p className="missed-dose__eyebrow">Medication history</p>
          <h2 id="missed-dose-title">Missed doses</h2>
        </div>
        <AlertCircle className="missed-dose__icon" aria-hidden="true" />
      </div>

      <ul className="missed-dose__list">
        {missedDoses.map((dose) => (
          <li key={`${dose.medicine}-${dose.day}`} className="missed-dose__item">
            <span className="missed-dose__date">{dose.day}</span>
            <div>
              <h3>{dose.medicine}</h3>
              <p>{dose.dosage} · scheduled for {dose.time}</p>
            </div>
          </li>
        ))}
      </ul>

      <Link to="/calendar" className="missed-dose__more">
        Show more <ChevronRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}
