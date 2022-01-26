import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'

const Dashboard = ({ getCurrentProfile, auth: {user}, profile: { profile, loading }}) => {

    useEffect(() => {
        getCurrentProfile()
    }, [])

    return loading && profile === null ? <Spinner/> :
    <>
        <div className='centeredColumn my-2'>

            <h1 className='text-primary'>Panel de control</h1>
            <p className='lead'>
                <i style={{'marginRight':'1rem'}} className='fas fa-user'></i> 
                Bienvenido { user && user.name }
            </p>
            
        </div>

        { profile !== null 
        
        ? 
            <DashboardActions/> 
        : 
            <>
                <div className='centered'>
                    <p>Aún no has creado tu perfil, por favor agrega información.</p>
                    <Link to='/create-profile' className="btn btn-primary my-1 button3d" >crea tu perfil</Link >
                </div>
            </> 

        }
    </>
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object,
    profile: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
