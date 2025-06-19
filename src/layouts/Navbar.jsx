import { NavLink } from "react-router-dom"

export default function Navbar() {
    return (
        <header className="bg-danger py-3 mb-4 fw-bold">
            <div className="container d-flex align-items-center">
                <nav className="d-flex align-items-center gap-5">
                    <h1>My Movies</h1>
                    <NavLink className={({isActive}) => (isActive ? `nav-link active text-white bg-dark p-2 rounded-4` : `nav-link p-2 rounded-4`)} to="/">Home</NavLink>
                    <NavLink className={({isActive}) => (isActive ? `nav-link active text-white bg-dark p-2 rounded-4` : `nav-link p-2 rounded-4`)} to="/about">About</NavLink>
                </nav>
            </div>
        </header>
    )
}