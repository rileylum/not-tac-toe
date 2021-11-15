import React, {useState} from 'react';
import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';

import './Form.css'

function LoginForm() {
    const [userFormData, setUserFormData] = useState({username: '', password: ''});
    const [loginUser] = useMutation(LOGIN_USER);

    const handleInputChange = (evt) => {
        const {name, value} = evt.target;
        setUserFormData({...userFormData, [name]: value});
    }
    
    const handleFormSubmit = async (evt) => {
        evt.preventDefault();

        const form = evt.currentTarget;
        // if form is not valid stop event
        if (form.checkValidity() === false) {
            evt.preventDefault();
            evt.stopPropogation();
        }

        try {
            const { data } = await loginUser({variables: {...userFormData}});
            Auth.login(data.login.token);
        } catch (err) {
            console.log(err);
        } finally {
            setUserFormData({
                username: '',
                password: ''
            });
        }        
    }

    return (
            <form className="Form">
                <div className="Form-item" >
                <label className="Form-label" htmlFor="username">Username</label>
                <input className="Form-input" type="text" id="username" name="username" value={userFormData.username} onChange={handleInputChange} required/>
                </div>
                <div className="Form-item" >
                <label className="Form-label" htmlFor="password">Password</label>
                <input className="Form-input" type="password" id="password" name="password" value={userFormData.password} onChange={handleInputChange} required/>
                </div>
                <div className="Form-item" >
                <button onClick={handleFormSubmit}>LOGIN</button>
                </div>
            </form>
    )
}

export default LoginForm;