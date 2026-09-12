import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
        return <Navigate to="/login" replace />;
    }

    try {
        const user = JSON.parse(storedUser);

        if (!user.name || !user.phone) {
            localStorage.removeItem("user");
            return <Navigate to="/login" replace />;
        }

        return children;
    } catch {
        localStorage.removeItem("user");
        return <Navigate to="/login" replace />;
    }
}