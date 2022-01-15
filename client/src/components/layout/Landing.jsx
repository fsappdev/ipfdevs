import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

const Landing = ({isAuthenticated}) => {

    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    } 
    
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">IPF-Developers</h1>
                    <p className="lead">
                        crea tu propio portfolio/perfil, comparte con otr@s developers y conecta con la comunidad
                    </p>
                    <div className="buttons round-buttons">
                        <Link to="/register" className="btn btn-primary round-buttons">Registrarse</Link>
                        <Link to="/login" className="btn btn-light">Entrar</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)
