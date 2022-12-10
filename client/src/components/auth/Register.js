import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import './Register.scss';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        isHost: false,
    });

    const { name, email, password, password2, isHost } = formData;

    const onChange = (e) =>{
        console.log(e.target.name, e.target.checked, isHost)
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked ? e.target.checked : e.target.value,
        });}

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2)
            setAlert("Passwords don't match", 'danger', 3000);
        else {
            register({ name, email, password, isHost });
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/properties' />;
    }

    return (
        <div className='w-25 ms-5 mt-3 register'>
            <h1 className='large text-primary'>Sign Up</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Create Your Account
            </p>
            <form className='form' onSubmit={onSubmit} novalidate>
                <div className='form-group required'>
                    <label class='form-label'>Name</label>
                    <div className='mb-3'>
                        <input
                            type='text'
                            placeholder='Name'
                            className='form-control'
                            name='name'
                            value={name}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                </div>
                <div className='form-group required'>
                    <label className='form-label'>Email Address</label>
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
                <div className='form-group required'>
                    <label className='form-label control-label'>Password</label>
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
                <div className='form-group required'>
                    <label className='form-label'>Reenter Password</label>
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
                <div className='form-check'>
                    <div className='mb-3'>
                        <input
                            type='checkbox'
                            className='form-check-input'
                            name='isHost'
                            id='hostCheckBox'
                            checked={isHost}
                            onChange={(e) => onChange(e)}
                        />
                        <label className='form-check-label' for='hostCheckBox'>
                            Become Host
                        </label>
                    </div>
                </div>
                <input
                    type='submit'
                    className='btn btn-primary'
                    value='Register'
                />
            </form>
            <p className='mt-3'>
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
