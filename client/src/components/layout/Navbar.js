import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <Link onClick={logout} to="#!">
                    <i className="fas fa-sign-out-alt"></i> {' '}
                    <span className="hide-sm">Logout</span>
                </Link>
            </li>

        </ul>
    );
    const guestLinks = (
        <ul>
            <li><Link to="#!">Students</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-school"></i> BattleClass</Link>
            </h1>
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>   /*?-check if authenticated: iftrue: show authlinks if false: show gest links */
            )}
        </nav>
    );
}

Navbar.prototype = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth
    //isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { logout })(Navbar);
