import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/auth'

const NeuNavbar = ({auth: {isAuthenticated, loading, user }, logout}) => {

   const authLinks = (
      <ul className="navbar-nav  mb-2 mb-md-0 ml-auto">
          <li className="nav-item active mx-3">
              <Link className="nav-link" to="/dashboard">
              <i class="fa-solid fa-address-card"></i>{' '}
                  <span className="">Panel de control</span>
              </Link>
          </li>
          
          <li className="nav-item active">
              <a className="btn" onClick={logout}>
                  <i className="fas fa-sign-out-alt"></i>{' '}
                  <span className="hide-sm">Cerrar Sesión</span>
              </a>
          </li>
      </ul>
  )
  
  const guestLinks = (
   <ul className="navbar-nav  mb-2 mb-md-0 ml-auto">
      <li className="nav-item active">
         <Link className="nav-link" to="/profile">
         <i class="fa-solid fa-user-group"></i>{' '}
            Conoce a la comunidad
            
         </Link>
      </li>

      {/* <li className="nav-item active">
         <Link className="nav-link" to="/register">Registrarse</Link>
      </li> */}

      <li className="nav-item active">
         <Link className="nav-link" to={"/login"}>
         <i className="fa-solid fa-arrow-right-to-bracket"></i>{' '}
            Inicia Sesíon o...
            
         </Link>
      </li>

      {/* <div className="d-flex mx-3 ">
         <a className="btn" type="submit">Iniciar Sesíon</a>
      </div> */}

      <div className="d-flex">
         <Link to="/register" className="btn" type="submit">Regístrate</Link>
      </div>
   </ul>
)

  return (
   <nav className="navbar navbar-expand-md navbar-dark navbar-fixed-top">
      <div className="container-fluid">

         <Link to="/" className="navbar-brand">
            <i className="fas fa-code"></i>
            {' '} IPF-Developers
         </Link>

         {
            !loading && isAuthenticated ? 
            <div className="nav-link w-50 hide">
               <i class="fa fa-user-circle-o" aria-hidden="true"></i>{' '}
               usuario:  {user.name}
            </div> 
            : null 
         }
         
         <button 
            className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
         
            <span className="navbar-toggler-icon"></span>
         </button>


         <div className="collapse navbar-collapse" id="navbarCollapse">
            {/* condtnl render */}
            
            
            
         {
            !loading && isAuthenticated ? authLinks : guestLinks 
         }

         </div>

      </div>
   </nav>
  )
};

NeuNavbar.propTypes = {
   logout : PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   auth: state.auth,
})


export default connect(mapStateToProps,{logout})(NeuNavbar);
