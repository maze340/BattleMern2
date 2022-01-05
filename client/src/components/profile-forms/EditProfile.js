import React, { Fragment, useState, useEffect } from 'react';
import { Link, /*withRouter, */ useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile} from '../../actions/profile';


const EditProfile = ({ 
    profile: { profile, loading },
    createProfile,
    getCurrentProfile,
    history }) => {
    const [formData, setFormData] = useState({ 
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getCurrentProfile();
        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.twitter,
            facebook: loading || !profile.social ? '' : profile.facebook,
            linkedin: loading || !profile.social ? '' : profile.linkedin,
            youtube: loading || !profile.social ? '' : profile.youtube,
            instagram: loading || !profile.social ? '' : profile.instagram
        });

        /*
        // if there is no profile, attempt to fetch one
        if (!profile) getCurrentProfile();
    
        // if we finished loading and we do have a profile
        // then build our profileData
        if (!loading && profile) {
          const profileData = { ...initialState };
          for (const key in profile) {
            if (key in profileData) profileData[key] = profile[key];
          }
          for (const key in profile.social) {
            if (key in profileData) profileData[key] = profile.social[key];
          }
          // the skills may be an array from our API response
          if (Array.isArray(profileData.skills))
            profileData.skills = profileData.skills.join(', ');
          // set local state with the profileData
          setFormData(profileData);
        }
        */
    }
    , [loading /*, getCurrentProfile, profile*/]);

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;


    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        //createProfile(formData, history);
        //createProfile(formData, navigate, profile ? true : false);
        createProfile(formData, navigate, true);
    };

    return (
        <section className="container">
      <h1 className="large text-primary">
        Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option value="0">* Select School Status</option>
            <option value="Teacher">Teacher</option>
            <option value="Manager">School Manager</option>
            <option value="Student">Student Straight</option>
            <option value="Student Helper">Student Helper</option>
            <option value="Student Manager">Student Manager</option>
            <option value="Instructor">Student Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are in the school</small
          >
        </div>
        <div className="form-group">
            <input
                type="text"
                placeholder="Class Section"
                name="company"
                value={company}
                onChange={e => onChange(e)}
            />
          {/* <small className="form-text"
            >Could be your own company or one you work for</small
          > */}
        </div>
        <div className="form-group">
            <input
                type="text"
                placeholder="Blog"
                name="website"
                value={website}
                onChange={onChange}
            />
          <small className="form-text"
            >Could be your blog</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text"
            >City & state suggested (eg. BeerSheva, BS)</small
          >
        </div>
        <div className="form-group">
            <input
                type="text"
                placeholder="* Skills"
                name="skills"
                value={skills}
                onChange={onChange}
            />
          <small className="form-text"
            >Please use comma separated values (eg.
            counting, reading, writing, playing music etc...)</small
          >
        </div>
        {/* <div className="form-group">
            <input
                type="text"
                placeholder="Github Username"
                name="githubusername"
                value={githubusername}
                onChange={onChange}
            />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div> */}
        <div className="form-group">
            <textarea
                placeholder="A short bio of yourself"
                name="bio"
                value={bio}
                onChange={onChange}
            />
            <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
            <button 
                onClick={() => toggleSocialInputs(!displaySocialInputs)} 
                type="button" 
                className="btn btn-light"
            >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input
                    type="text"
                    placeholder="Twitter URL"
                    name="twitter"
                    value={twitter}
                    onChange={onChange}
                />
            </div>

            <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input
                    type="text"
                    placeholder="Facebook URL"
                    name="facebook"
                    value={facebook}
                    onChange={onChange}
                />
            </div>

            <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input
                    type="text"
                    placeholder="YouTube URL"
                    name="youtube"
                    value={youtube}
                    onChange={onChange}
                />
            </div>

            <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input
                    type="text"
                    placeholder="Linkedin URL"
                    name="linkedin"
                    value={linkedin}
                    onChange={onChange}
                />
            </div>

            <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input
                    type="text"
                    placeholder="Instagram URL"
                    name="instagram"
                    value={instagram}
                    onChange={onChange}
                />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </section>
    );
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired ,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(EditProfile);




/* 

 CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired ,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
} 

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, { createProfile})(CreateProfile); */

