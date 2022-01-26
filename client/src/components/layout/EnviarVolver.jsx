import { Link } from 'react-router-dom'

const EnviarVolver = () => {
  return (
    <div className='centeredRow' >
        <input type="submit" 
        style={{backgroundColor: "#17a2b8", color: "white"}} 
        className="button3d btn my-1" />
        <Link className="button3d btn btn-light my-1" to="/dashboard">Volver</Link>
    </div>
  )
    
};

export default EnviarVolver;
