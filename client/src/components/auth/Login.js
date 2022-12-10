import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import './Register.scss';

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
        <div className='w-25 ms-5 mt-3 register'>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Sign Into Your Account
            </p>
            <form className='form' onSubmit={onSubmit} noValidate>
                <div className='form-group required'>
                    <label className='form-label control-label'>Email</label>
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
                </div>
                <div className='form-group required'>
                    <div className='mb-3'>
                        <label className='form-label control-label'>
                            Password
                        </label>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='Password'
                            value={password}
                            name='password'
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                </div>
                <div className='d-grid'>
                    <input
                        type='submit'
                        className='btn btn-primary'
                        value='Login'
                    />
                </div>
            </form>
            <p className='mt-3'>
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
