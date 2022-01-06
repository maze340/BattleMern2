import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import { getCurrentProfile } from '../../actions/profile';


// export const Navbar = ({ auth: { isAuthenticated, loading }, logout, getCurrentProfile, profile : {profile} }) => {
const Navbar = ({ auth: { isAuthenticated, loading }, logout, getCurrentProfile, profile : {profile} }) => {

    useEffect(() => {
        getCurrentProfile();
      }, []);   

    const authLinks = (
        <ul>
            {
                profile !== null && profile.status && profile.status == "Manager" &&
                <li>
                    <Link to="/profiles">Students</Link>
                </li>
            }
            <li>
                <Link to="/dashboard">
                <i className="fas fa-user" />{' '}
                <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <Link onClick={logout} to="/">
                    <i className="fas fa-sign-out-alt"></i> {' '}
                    <span className="hide-sm">Logout</span>
                </Link>
            </li>

        </ul>
    );
    const guestLinks = (
        <ul>
            {/* <li><Link to="/profiles">Students</Link></li> */}
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
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
    //isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { logout, getCurrentProfile })(Navbar);
