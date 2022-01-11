import { useState } from "react";
import { Link } from "react-router-dom";
//import  axios from "axios";
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types';

const Register = ({setAlert}) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordDos: ""
    })

    const {name, email, password, passwordDos} = formData

    const handleChange = e => setFormData({...formData, [e.target.name] : e.target.value})

    const handleOnSubmit = async (e) => { 
        e.preventDefault()

        if(password !== passwordDos){
            //console.log('las contraseñas no coinciden')
            setAlert('las contraseñas no coinciden','danger')
        }else{
            
            console.log('success')
        }
    }
     
    ////////testing proxy 
    const handleTest = async () => { 

            try {

                const res = await fetch('/api')
                const data = await res.json()

                console.log(data)
                
                return 
            } catch (err) {
                console.error(err.response.data)
            }
        
    }

    return (
        <>
            <div className="centered">
                <h1 className="large text-primary">Registrarse/Sing Up</h1>
                <p className="lead button3d"><i className="fas fa-user"></i> Crea tu cuenta/Create Your Account</p>
            </div>
            
            <form className="form" onSubmit={(e)=>handleOnSubmit(e)}>
                
                <div className="form-group">
                    <input className="round"
                        type="text" 
                        placeholder="nombre/name" 
                        name="name"
                        value={name}
                        onChange={e => handleChange(e)} 
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <input type="email" 
                        placeholder="correo electrónico/email" 
                        name="email"
                        value={email} 
                        onChange={e => handleChange(e)}
                    />
                    <small className="form-text">
                        este sitio usa <code>Gravatar</code> asi que si quieres usar una imagen de perfil, usa un correo asociado a <code>Gravatar</code> 
                    </small>
                </div>
                
                <div className="form-group">
                    <input type="password"
                        placeholder="password"
                        name="password"
                        value={password}
                        minLength="6"
                        onChange={e => handleChange(e)}
                    />
                </div>
                
                <div className="form-group">
                    <input type="password"
                        placeholder="reingrese el password/confirm password"
                        name="passwordDos"
                        value={passwordDos}
                        minLength="6"
                        onChange={e => handleChange(e)}
                    />
                </div>
                
                <div className="centered">
                    
                    <input type="submit" 
                        //className="btn btn-primary " 
                        className="button3d"
                        value="pulse para registrarse_"
                        //onSubmit={e => handleOnSubmit(e)} 
                    />
                    
                    {/* <button className="button3d btn btn-primary" onClick={handleTest} type="button">Click Me!</button>  */}

                    <p className="my-1">
                        ya tienes una cuenta? <Link to="/login">entrar</Link>
                    </p>
                </div>

            </form>

            
        </>
    )
}


Register.propTypes = {
    setAlert : PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Register)
