import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';


const DashboardActions = ({
  getCurrentProfile,
  auth : { user },
  profile : { profile, loading }
}) => {

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);  

  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> My Profile
      </Link>

      {
        profile.status && profile.status === "Teacher" && 
        <Link to='/add-experience' className='btn btn-light'>
          <i className='fab fa-black-tie text-primary' /> Add Experience
        </Link>
      }
      {
        profile.status && profile.status === "Teacher" && 
        <Link to='/add-education' className='btn btn-light'>
          <i className='fas fa-graduation-cap text-primary' /> Add Education
        </Link>
      }

    </div>
  );
};
DashboardActions.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});


//export default DashboardActions;
export default connect(mapStateToProps, { getCurrentProfile})(DashboardActions);
