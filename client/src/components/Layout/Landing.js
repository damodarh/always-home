import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/properties' />;
  }
  return (
    <Fragment>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Welcome to Always Home !!!</h1>
            <p className='lead'>
              There is nothing like 
              staying at home for real comfort.<br/>
              Host properties, experience homes, let others know about your
              experience
            </p>
            <div className='buttons'>
              <Link to='/register' className='btn1 btn btn-primary'>
                Sign Up
              </Link>
              <Link to='/login' className='btn2 btn btn-light'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
