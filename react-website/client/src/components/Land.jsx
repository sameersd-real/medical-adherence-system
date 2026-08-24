import { useEffect } from "react";
import {
  Activity,
  Target,
  ArrowRight,
  Bell,
  AlarmClock,
  Calendar,
  LineChart,
  Users,
  Smartphone,
  FileText,
  Globe,
  Quote,
  FolderGit2,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./land.css";

function Landing() {
  useEffect(() => {
    const animElements = document.querySelectorAll(".animate-on-scroll");
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };
    const scrollObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      observerOptions
    );
    animElements.forEach((element) => {
      scrollObserver.observe(element);
    });
    return () => {
      scrollObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Background glows */}
      <div className="glow-bg glow-1"></div>
      <div className="glow-bg glow-2"></div>
      <div className="glow-bg glow-3"></div>

      {/* Navigation */}
      <header className="header">
        <div className="nav-container">
          <a href="#hero" className="logo-link" id="nav-logo">
            <div className="logo-icon">
              <Activity className="pulse-icon" />
            </div>
            <span className="logo-text">
              MedAdhere<span className="highlight">.</span>
            </span>
          </a>

          <nav className="nav-menu" id="nav-menu">
            <a href="#objective" className="nav-item">
              Objective
            </a>

            <a href="#features" className="nav-item">
              Key Features
            </a>

            <a href="#impact" className="nav-item">
              Impact & Vision
            </a>

            <a href="#about" className="nav-item">
              About Project
            </a>
          </nav>

        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero-section" id="hero">
          <div className="container hero-container text-center">
            <div className="hero-content">
              <div className="badge-container animate-on-scroll">
                <span className="hero-badge">
                  🏥 Medical Adherence System
                </span>
              </div>

              <h1 className="hero-title animate-on-scroll">
                Helping Patients Stay{" "}
                <span className="gradient-text">On Track</span>
                <br />
                With Their Medications
              </h1>

              <p className="hero-description animate-on-scroll">
                The Medical Adherence System is a smart and user-friendly
                solution designed to help patients take their medicines on time
                and follow their prescribed treatment plans. The system
                provides timely medication reminders, tracks adherence, and
                helps caregivers or healthcare providers monitor medication
                routines.
              </p>

              <div className="goal-highlight-card glass-panel animate-on-scroll">
                <div className="goal-badge">
                  <Target /> OUR GOAL
                </div>

                <p className="goal-text">
                  Our goal is simple: reduce missed doses, improve treatment
                  consistency, and make healthcare management easier for
                  patients and their families.
                </p>
              </div>

              <div className="hero-cta-group animate-on-scroll">
                <Link to="/login" className="btn btn-primary btn-get-started"
                  id="hero-get-started-btn">
                  <span>Get Started</span>

                  <div className="arrow-wrapper">
                    <ArrowRight className="btn-arrow" />
                  </div>
                </Link>

                <a href="#features" className="btn btn-tertiary">
                  <span>Explore Features</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Objective Section */}
        <section className="objective-section" id="objective">
          <div className="container">
            <div className="objective-card glass-panel animate-on-scroll">
              <div className="objective-grid">
                <div className="objective-info">
                  <span className="section-badge">
                    🎯 Our Objective
                  </span>

                  <h2>Targeting Medication Non-Adherence</h2>

                  <p className="objective-text">
                    Medication non-adherence is a common problem that can
                    affect the effectiveness of treatment. Our project aims to
                    provide a simple digital system that reminds patients
                    about their medications and encourages them to follow
                    their prescribed schedules regularly.
                  </p>
                </div>

                <div className="objective-illustration">
                  <div className="pulsing-rings-wrapper">
                    <div className="pulse-ring ring-1"></div>
                    <div className="pulse-ring ring-2"></div>
                    <div className="pulse-ring ring-3"></div>

                    <div className="center-pill-icon">
                      <Bell className="alert-icon-svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="features-section" id="features">
          <div className="container">
            <div className="section-header text-center">
              <span className="section-badge">Capabilities</span>

              <h2 className="section-title">
                💡 Key Features
              </h2>

              <p className="section-subtitle">
                Every aspect of MedAdhere is engineered to optimize
                compliance, improve patient health outcomes, and connect
                caregivers seamlessly.
              </p>
            </div>

            <div className="features-grid">
              {/* Feature 1 */}
              <div className="feature-card animate-on-scroll">
                <div className="card-glow"></div>

                <div className="feature-icon-wrapper red-glow">
                  <AlarmClock className="feature-icon" />
                </div>

                <h3>⏰ Medication Reminders</h3>

                <p>
                  Alerts patients when it is time to take their medicines.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="feature-card animate-on-scroll">
                <div className="card-glow"></div>

                <div className="feature-icon-wrapper teal-glow">
                  <Calendar className="feature-icon" />
                </div>

                <h3>💊 Medicine Schedule</h3>

                <p>
                  Stores medicine names, dosage, and prescribed timings.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="feature-card animate-on-scroll">
                <div className="card-glow"></div>

                <div className="feature-icon-wrapper blue-glow">
                  <LineChart className="feature-icon" />
                </div>

                <h3>📊 Adherence Tracking</h3>

                <p>
                  Records whether medicines were taken on time.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="feature-card animate-on-scroll">
                <div className="card-glow"></div>

                <div className="feature-icon-wrapper indigo-glow">
                  <Users className="feature-icon" />
                </div>

                <h3>👨‍⚕️ Caregiver Monitoring</h3>

                <p>
                  Allows authorized caregivers to keep track of medication
                  routines.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="feature-card animate-on-scroll">
                <div className="card-glow"></div>

                <div className="feature-icon-wrapper pink-glow">
                  <Bell className="feature-icon" />
                </div>

                <h3>🔔 Missed Dose Alerts</h3>

                <p>
                  Notifies users when a scheduled dose is missed.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="feature-card animate-on-scroll">
                <div className="card-glow"></div>

                <div className="feature-icon-wrapper gold-glow">
                  <Smartphone className="feature-icon" />
                </div>

                <h3>📱 User-Friendly Interface</h3>

                <p>
                  Designed to be simple and accessible for different age
                  groups.
                </p>
              </div>

              {/* Feature 7 */}
              <div className="feature-card feature-card-wide animate-on-scroll">
                <div className="card-glow"></div>

                <div className="feature-icon-wrapper purple-glow">
                  <FileText className="feature-icon" />
                </div>

                <div className="wide-card-content">
                  <h3>📈 Progress Reports</h3>

                  <p>
                    Provides a clear overview of medication adherence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="vision-section" id="impact">
          <div className="container grid-2">
            <div className="vision-card glass-panel animate-on-scroll">
              <div className="vision-header">
                <Globe className="vision-icon-top" />

                <h3>🌍 ECS Project Impact</h3>
              </div>

              <p className="impact-text">
                Through this ECS project, we aim to use technology to address
                a real-world healthcare challenge. The system can be especially
                useful for elderly people, patients with long-term treatments,
                and individuals who frequently forget their medication
                schedules.
              </p>
            </div>

            <div className="quote-card glass-panel animate-on-scroll">
              <div className="quote-badge">
                <Quote className="quote-icon" />

                <span>🚀 OUR VISION</span>
              </div>

              <blockquote>
                “Take the right medicine, at the right time, for better
                health.”
              </blockquote>

              <p className="quote-author">
                We envision a future where technology supports patients in
                managing their medication effectively and helps healthcare
                providers and caregivers contribute to better treatment
                outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section" id="about">
          <div className="container">
            <div className="about-card glass-panel animate-on-scroll">
              <div className="about-grid">
                <div className="about-info">
                  <span className="about-badge">
                    👥 About the Project
                  </span>

                  <h2>Project Metadata</h2>

                  <p>
                    MedAdhere is developed as an Engineering Clinics
                    Project (ECS) aimed at building functional, real-world
                    solutions that combine medical sciences and computing
                    technology.
                  </p>

                  <div className="heartbeat-art">
                    <svg
                      viewBox="0 0 300 60"
                      className="heartbeat-svg"
                    >
                      <path
                        d="M 0 30 L 70 30 L 80 15 L 90 45 L 100 30 L 120 30 L 125 10 L 130 50 L 135 30 L 155 30 L 160 5 L 165 55 L 170 30 L 190 30 L 195 20 L 200 40 L 205 30 L 300 30"
                        fill="none"
                        stroke="rgba(0, 245, 212, 0.4)"
                        strokeWidth="2"
                      />

                      <path
                        d="M 0 30 L 70 30 L 80 15 L 90 45 L 100 30 L 120 30 L 125 10 L 130 50 L 135 30 L 155 30 L 160 5 L 165 55 L 170 30 L 190 30 L 195 20 L 200 40 L 205 30 L 300 30"
                        fill="none"
                        stroke="#00f5d4"
                        strokeWidth="2"
                        strokeDasharray="300"
                        strokeDashoffset="300"
                        className="heartbeat-path"
                      />
                    </svg>
                  </div>
                </div>

                <div className="about-metadata">
                  <div className="metadata-row">
                    <div className="meta-label">
                      <FolderGit2 />
                      Project
                    </div>

                    <div className="meta-val">
                      Medical Adherence System
                    </div>
                  </div>

                  <div className="metadata-row">
                    <div className="meta-label">
                      <Award />
                      Type
                    </div>

                    <div className="meta-val">
                      ECS – Engineering Clinics Project
                    </div>
                  </div>

                  <div className="metadata-row">
                    <div className="meta-label">
                      <Activity />
                      Domain
                    </div>

                    <div className="meta-val">
                      Healthcare & Technology
                    </div>
                  </div>

                  <div className="metadata-row">
                    <div className="meta-label">
                      <Target />
                      Focus
                    </div>

                    <div className="meta-val">
                      Medication Management and Patient Support
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-logo">
            <div className="logo-icon">
              <Activity />
            </div>

            <span className="logo-text">
              MedAdhere
            </span>
          </div>

          <p className="footer-text">
            &copy; 2026 MedAdhere ECS Project. Built for healthcare
            improvement and Clinics.
          </p>

          <div className="footer-bottom-links">
            <a href="#hero">Back to Top</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Landing;