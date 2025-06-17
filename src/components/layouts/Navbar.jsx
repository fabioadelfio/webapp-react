import { NavLink } from "react-router-dom"

export default function Navbar() {
    return (
        <header className="bg-secondary mb-4 fw-bold">
            <div className="container">
                <nav className="d-flex align-items-center gap-5">
                    <h1>My Movies</h1>
                    <NavLink className={({isActive}) => (isActive ? `nav-link active text-white bg-dark` : `nav-link`)} to="/">Home</NavLink>
                    <NavLink className={({isActive}) => (isActive ? `nav-link active text-white bg-dark` : `nav-link`)} to="/about">About</NavLink>
                </nav>
            </div>
        </header>
    )
}