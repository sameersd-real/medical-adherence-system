import { Link } from "react-router-dom";
export default function NotFound(){
    return (
        <div>
          <h1>Not Found</h1>
          <Link to="/login">Go to Login</Link>
          <Link to="/dashboard">Go to Dashboard</Link>
        </div>
    );
}