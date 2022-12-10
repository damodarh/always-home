import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Search from "../Search/Search";
import "./AlwaysHomeHeader.css";

const AlwaysHomeHeader = ({
  searchText,
  handleInputChange,
  auth: { isAuthenticated, loading, user },
  logout,
}) => {
  const authLinks = (
    <ul className='navbar-nav ms-auto'>
      {user && user.isHost && (
        <li className='nav-item'>
          <Link className='nav-link text-black' to='/add-property'>
            <i class='fa fa-thin fa-building'></i>{" "}
            <span className='ms-2'>Host Property</span>
          </Link>
        </li>
      )}
      <li className='nav-item'>
        <Link className='nav-link text-black' to='/profile'>
          <i class='fa fa-thin fa-user'></i>{" "}
          <span className='ms-2'>Profile</span>
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link text-black' to='/favorites'>
          <i class='fa fa-thin fa-star'></i>{" "}
          <span className='ms-2'>Favorites</span>
        </Link>
      </li>
      <li className='nav-item'>
        <Link
          className='nav-link active text-black'
          aria-current='page'
          to='/login'
          onClick={logout}
        >
          <i className='fa fa-light fa-arrow-right-to-bracket fa-rotate-180'></i>{" "}
          <span className='ms-2'>Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='navbar-nav ms-auto'>
      <li className='nav-item'>
        <Link className='nav-link text-black' to='/register'>
          <i className='fas fa-thin fa-user-plus'></i>{" "}
          <span className='ms-2'>Register</span>
        </Link>
      </li>
      <li className='nav-item'>
        <Link
          className='nav-link active text-black'
          aria-current='page'
          to='/login'
        >
          <i class='fas fa-light fa-arrow-right-to-bracket'></i>{" "}
          <span className='ms-2'>Login</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-white border-bottom'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            <img src='img/AH.png' className='logo-image' alt='logo' />
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarText'
            aria-controls='navbarText'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          {isAuthenticated && (
            <div>
              <Search
                searchText={searchText}
                handleInputChange={handleInputChange}
              />
            </div>
          )}
          <div className='collapse navbar-collapse' id='navbarText'>
            {!loading && <>{isAuthenticated && authLinks}</>}
          </div>
        </div>
      </nav>
    </>
  );
};

AlwaysHomeHeader.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(AlwaysHomeHeader);
