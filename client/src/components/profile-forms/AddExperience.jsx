import { useState } from 'react';
//import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile'
import PropTypes from 'prop-types';
import EnviarVolver from '../layout/EnviarVolver';


const AddExperience = ({ addExperience, history }) => {

    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location:'',
        from:'',
        to:'',
        current:false,
        description:''
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const { 
    company,
    title,
    location,
    from,
    to,
    current,
    description } = formData

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})

  return (
    <>
      <div className='centered'>
        <h1 className="large text-primary">
        Agregar Experiencia
        </h1>
        <p className="lead">
            <i className="fas fa-code-branch"></i> agrega cualquier puesto como developer/programador/a
            que hayas tenido en el pasado
        </p>
      </div>
      <small>* = el campo es requerido</small>
      <form className="form" onSubmit={ e => {
        e.preventDefault()
        addExperience(formData, history)
      }}>
        <div className="form-group">
          <input type="text"
          onChange={(e)=>onChange(e)} 
          placeholder="* nombre del puesto" 
          name="title"
          value={title} 
          required />
        </div>

        <div className="form-group">
          <input type="text" 
          onChange={(e)=>onChange(e)}
          placeholder="* Companía" 
          name="company"
          value={company} 
          required />
        </div>

        <div className="form-group">
          <input type="text" 
          onChange={(e)=>onChange(e)}      
          placeholder="ubicación" 
          name="location" 
          value={location}
          />
        </div>

        <div className="form-group">
          <h4>Fecha Desde</h4>
          <input type="date" 
          onChange={(e)=>onChange(e)}
          name="from" />
        </div>

        <div className="form-group">
          <p>
            <input type="checkbox" 
            onChange={ e => {
                setFormData({...formData, current: !current})
                toggleDisabled(!toDateDisabled)
            }}
            name="current" 
            value={current} /> 
            {' '}Trabajo Actual
          </p>
        </div>

        <div className="form-group">
          <h4>Fecha Hasta</h4>
          <input type="date" 
          onChange={(e)=>onChange(e)}
          name="to" 
          value={to}
          disabled={toDateDisabled ? true : false}
          />
        </div>

        <div className="form-group">
          <textarea
            onChange={(e)=>onChange(e)}
            name="description"
            value={description}
            cols="30"
            rows="5"
            placeholder="Descripción del puesto"
          ></textarea>
        </div>
        
        <EnviarVolver/>
      </form>
    </>
    )
};

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
};

export default connect(null,{ addExperience })(AddExperience);
