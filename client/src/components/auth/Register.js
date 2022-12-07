import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2)
            setAlert("Passwords don't match", 'danger', 3000);
        else {
            console.log(register);
            register({ name, email, password });
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/properties' />;
    }

    return (
        <div className='w-25 ms-5 mt-3'>
            <h1 className='large text-primary'>Sign Up</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Create Your Account
            </p>
            <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                    <div className='mb-3'>
                        <input
                            type='text'
                            placeholder='Name'
                            className='form-control'
                            name='name'
                            value={name}
                            onChange={(e) => onChange(e)}
                            //required
                        />
                    </div>
                </div>
                <div className='form-group'>
                    <div className='mb-3'>
                        <input
                            type='email'
                            className='form-control'
                            placeholder='Email Address'
                            name='email'
                            value={email}
                            onChange={(e) => onChange(e)}
                            //required
                        />
                    </div>
                </div>
                <div className='form-group'>
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
                </div>
                <div className='form-group'>
                    <div className='mb-3'>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='Confirm Password'
                            name='password2'
                            value={password2}
                            onChange={(e) => onChange(e)}
                            minLength='6'
                        />
                    </div>
                </div>
                <input
                    type='submit'
                    className='btn btn-primary'
                    value='Register'
                />
            </form>
            <p className='my-1'>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </div>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
