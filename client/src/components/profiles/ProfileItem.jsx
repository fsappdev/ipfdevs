
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import userDefault from'../../img/default-user.png'
//import ProfileCard from '../layout/ProfileCard'


const ProfileItem = ({
  profile: {
    user: {_id, name, avatar}, 
    status,
    company,
    location,
    skills
  }
}) => {
  /* return <div className='bg-light 
                        shadow-lg rounded 
                        rounded-3 
                        w-75 my-2 p-3
                        d-flex 
                        justify-content-between'>
          
          <img src={avatar ? avatar : userDefault } alt="" className="round-img" /> 
          
          <div className="centeredColumn">
            <h2> {name}  </h2>
            <p>{status} {company && <span>en {company}</span>}</p>
            <p className="my-1">{location && <span>{location}</span> }</p>
            <Link to={`/profile/${_id}`} className="btn btn-primary">
            </Link>
          </div>
        </div> */
        return (
          <div>
              <div className="card mb-3 " style={{ minWidth:"500px", width:"850px" }} >
                  <div className="row" >
                      <div className="col-md-4" /* style={{height:"100%!"}} */>
                      <img src={avatar ? avatar : userDefault } style={{minHeight:"100%"}}  
                      className="img-fluid rounded-start" alt="..."/>
                      </div>
                      <div className="col-md-8">
                      <div className="card-body ">
                          <h5 className="card-title">{name}</h5>
                          <p className="card-text">{status} {company && <span>en: {company}</span>}</p>
                          <p className="card-text">{location && <span>{location}</span>}</p>
                          {/* <p className="card-text">
                            <small className="text-muted">
                              {skills}
                            </small>
                          </p> */}
                          <ul>
                            {skills.slice(0,4).map((item,index)=>{
                              return <li key={index}>
                                    <i className="fas fa-check"></i>
                                    {item}
                                 </li>
                            })}
                          </ul>
                          <Link to={`/profile/${_id}`} className="btn btn-primary">
                            ver perfil  
                          </Link>
                      </div>
                      
                      </div>
                  </div>
              </div>
          </div>
        )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}


export default ProfileItem