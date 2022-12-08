import axios from 'axios';
import { setAlert } from './alert';


// Create/Update property
export const addProperty = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'multi-part/form-data',
        },
    };
    const body = JSON.stringify({ email, password });
    console.log(body);
    try {
        const res = await axios.post('/api/properties', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        //dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};