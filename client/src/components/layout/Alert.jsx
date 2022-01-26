import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({ alerts }) => 
    alerts !== null && alerts.length > 0 && alerts.map(item => (
        
        //<div key={item.id} className={`alert3d-${item.alertType}`}>
        <div
            key={item.id} 
            className={`centered alert alert-${item.alertType}`}
        >
            {item.msg}
        </div>
    ))

Alert.propTypes = {
    alerts : PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert) 
