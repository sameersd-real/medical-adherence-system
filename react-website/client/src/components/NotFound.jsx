import { Link } from "react-router-dom";
import { Home, LogIn, ArrowLeft } from "lucide-react";
import "./NotFound.css";

export default function NotFound() {
    return (
        <div className="not-found-page">
            <div className="not-found-card">
                <div className="not-found-code">404</div>

                <h1>Page Not Found</h1>

                <p>
                    The page you're looking for doesn't exist or may have
                    been moved.
                </p>

                <div className="not-found-actions">
                    <Link to="/dashboard" className="not-found-btn primary">
                        <Home size={18} />
                        Dashboard
                    </Link>

                    <Link to="/login" className="not-found-btn secondary">
                        <LogIn size={18} />
                        Login
                    </Link>
                </div>

                <Link to="/" className="not-found-back">
                    <ArrowLeft size={16} />
                    Back to home
                </Link>
            </div>
        </div>
    );
}