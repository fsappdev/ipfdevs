import axios from 'axios'
import { setAlert } from './alert'
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types'

//Get Current user profile
export const getCurrentProfile = () => async dispatch => {

    try {
        
        const res = await axios.get('back/api/profile/me')

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }

}

//Create or Update current profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        
        const config = {
            headers: {'Content-Type':'application/json'},
        }

        const res = await axios.post('back/api/profile', formData, config)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Perfil actualizado' : 'Perfil creado','success' ))

        if (!edit) history.push('/dashboard')

    } catch (err) {

        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
} 

// add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        
        const config = {
            headers: {'Content-Type':'application/json'},
        }

        const res = await axios.put('back/api/profile/experience', formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experiencia añadida','success' ))

        history.push('/dashboard')

    } catch (error) {

        console.log('88 err=>', error)

        const errors = error.response.data.errors

        if(errors){
            
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//add education
export const addEducation = (formData, history) => async dispatch => {
    try {
        
        const config = {
            headers: {'Content-Type':'application/json'},
        }

        const res = await axios.put('back/api/profile/education', formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Educación añadida','success' ))

        history.push('/dashboard')

    } catch (err) {

        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}