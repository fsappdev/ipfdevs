import { useState } from "react";
import { Link } from "react-router-dom";
//import  axios from "axios";

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const {email, password} = formData

    const handleChange = e => setFormData({...formData, [e.target.name] : e.target.value})

    const handleOnSubmit = async (e) => { 
        e.preventDefault()
            console.log('success')
    }
    
     
    return (
        <>
            <div className="centered">
                <h1 className="large text-primary">Entrar/Sing In</h1>
                <p className="lead button3d"><i className="fas fa-user"></i> Entra con tu cuenta de.../Sing into your account</p>
            </div>
            
            <form className="form" onSubmit={(e)=>handleOnSubmit(e)}>
                
                <div className="form-group">

                    <input type="email" 
                        placeholder="correo electrónico/email" 
                        name="email"
                        value={email} 
                        onChange={e => handleChange(e)}
                    />
                    
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
                
                <div className="centered">
                    
                    <input type="submit" 
                        //className="btn btn-primary " 
                        className="button3d"
                        value="pulse para iniciar sesión_"
                        //onSubmit={e => handleOnSubmit(e)} 
                    />
                    
                    {/* <button className="button3d btn btn-primary" onClick={handleTest} type="button">Click Me!</button>  */}

                    <p className="my-1">
                        NO tienes una cuenta? <Link to="/register">registrate/sign Up</Link>
                    </p>
                </div>

            </form>

            
        </>
    )
}

export default Login
