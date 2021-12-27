import React from 'react';
import PropTypes from 'prop-types'

const Dashboard = props => {
    return (
        <section className="container">
            <div>
                Dashboard
            </div>
            <p className="lead">
                <i className="fas fa-user" /> Welcome
            </p>
            <p>This space is  allowed only for private members</p>
        </section>
    )
}
Dashboard.propTypes = {

}

export default Dashboard

