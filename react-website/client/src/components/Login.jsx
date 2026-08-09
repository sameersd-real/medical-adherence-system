import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Link to="/login">Go to Login</Link>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
}