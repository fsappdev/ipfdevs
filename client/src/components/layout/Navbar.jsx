import {useState, useContext} from "react"
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> IPF-devs
                </Link>
            </h1>
            <ul>
                <li><Link to="/profile">Developers</Link></li>
                <li><Link to="/register">Registrarse</Link></li>
                <li><Link to={"/login"}>Entrar</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
