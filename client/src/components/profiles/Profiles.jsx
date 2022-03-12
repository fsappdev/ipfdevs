import { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import {getAllProfiles} from '../../actions/profile'
import ProfileItem from './ProfileItem'




const Profiles = ({ getAllProfiles, profile: { profiles, loading }}) => {
  
    useEffect(() => {
      getAllProfiles()
    }, [])
     

  return (
    <>
      {!loading ? 
      <>
        <div className="centeredColumn my-2">
          <h1 className="text-primary">
              Developers
          </h1>
          <p /* className="lead" */>
            <i className="fab fa-connectdevelop"></i>
            navega y conecta con otros devs  
          </p>
        </div>
        <div className='centeredColumn'>
          {profiles.length > 0 ? console.info(profiles.length) : null }
          { 
            profiles.length > 0 ? 
/*               console.log(profiles.length)
 */              profiles.map(item=>{
                  console.log(item)
                return <ProfileItem key={item._id} profile={item}/>
              })
            : <h4>no hay perfiles disponibles</h4>
          }
        </div>
      </> 
      : <Spinner/> }
    </>
  )
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, {getAllProfiles})(Profiles)