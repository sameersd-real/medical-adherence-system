import "./Navbar.css";
export default function Navbar({name, phno}){

    return (
        <>
            <nav>
                <div className="details-bar">
                    <p>Smart Medical Adherence System</p>
                    <p><strong>{name}</strong>,  ({phno})</p>
                    <button>Logout</button>
                </div>
            </nav>
        </>
    );
}