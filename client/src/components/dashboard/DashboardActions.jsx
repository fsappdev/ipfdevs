import React from 'react'
import { Link } from "react-router-dom";

const DashboardActions = () => {
    return (
        <div className="centeredRow">
            <Link to="/edit-profile" className="btn "
            ><i className="fas fa-user-circle text-primary"></i> Editar tu Perfil</Link>
            
            <Link to="/add-experience" className="btn mx-2"
            ><i className="fab fa-black-tie text-primary"></i> Agregar Experiencia</Link>
            
            <Link to="/add-education" className="btn "
            ><i className="fas fa-graduation-cap text-primary"></i> Agregar Educación</Link>
            
        </div>
    )
}

export default DashboardActions
