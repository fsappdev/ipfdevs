import React from 'react'
import { Link } from "react-router-dom";

const DashboardActions = () => {
    return (
        <div className="centeredRow mb-4">
            <Link to="/edit-profile" className="btn red-icon"
            ><i className="fas fa-user-circle red-icon"></i> Editar tu Perfil</Link>
            
            <Link to="/add-experience" className="btn mx-2"
            ><i className="fab fa-black-tie text-primary"></i> Agregar Experiencia</Link>
            
            <Link to="/add-education" className="btn "
            ><i className="fas fa-graduation-cap green-icon"></i> Agregar Educación</Link>
        </div>
    )
}

export default DashboardActions
