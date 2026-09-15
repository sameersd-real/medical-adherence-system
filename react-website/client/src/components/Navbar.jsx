import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar({ name, phno }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav>
            <div className="details-bar">
                <p>Smart Medical Adherence System</p>
                <p><strong>{name}</strong>, ({phno})</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}