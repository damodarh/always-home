import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        login(email, password);
    };
    //Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/properties' />;
    }

    return (
        <div className='w-25 ms-5 mt-3'>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Sign Into Your Account
            </p>
            <form className='form' onSubmit={onSubmit}>
                <div className='mb-3'>
                    <input
                        type='email'
                        className='form-control'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <input
                        type='password'
                        className='form-control'
                        placeholder='Password'
                        value={password}
                        name='password'
                        onChange={(e) => onChange(e)}
                        minLength='6'
                    />
                </div>
                <div className='d-grid'>
                    <input
                        type='submit'
                        className='btn btn-primary'
                        value='Login'
                    />
                </div>
            </form>
            <p className='my-1'>
                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
