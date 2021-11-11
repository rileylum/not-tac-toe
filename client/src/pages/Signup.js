import React, {useState} from 'react';
import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function SignupForm() {
    const [userFormData, setUserFormData] = useState({username: '', password: ''});
    const [addUser] = useMutation(ADD_USER);

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
            const { data } = await addUser({variables: {...userFormData}});
            Auth.login(data.addUser.token);
        } catch (err) {
            console.log(err);
        } finally {
            console.log("hello")
            setUserFormData({
                username: '',
                password: ''
            });
        }        
    }

    return (
        <div>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={userFormData.username} onChange={handleInputChange} required/>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password" value={userFormData.password} onChange={handleInputChange} required/>
                <button onClick={handleFormSubmit}>SIGN UP</button>
            </form>
        </div>
    )
}

export default SignupForm;