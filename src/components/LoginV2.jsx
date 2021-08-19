import React, { useRef, useState } from 'react';

export default function Login (props) {
    const formsRef = useRef();

    const handleValidate = () => {
        this.formsRef.current.handleValidate();
    }

    return (
        <div className="centered-form">
            <div className="centered-form__form">
                <div className="form-field">
                    <h3>{props.title}</h3>
                </div>
                {
                    props.match.path === '/SignUp' ?  
                        <LoginForm ref={formsRef}/> 
                            : 
                        <SignInForm ref={formsRef} />
                }
                <div className="form-field">
                    <button 
                        onClick={handleValidate} id='loginButton'>{`Login`}</button>
                </div>
            </div>
        </div>
    );
}

function LoginForm (props) {
    const { username, setUsermame} = useState('');
    const { password, setPassword} = useState('');


    const handleValidate = () => {
        return (username && password)
    }

    return (
        <>
            <div className="form-field">
                <label>Username <sup style={{color:'red'}}>*</sup></label>
                <input type="text" value={username} onChange={(event) => { setUsermame(event.target.value) }} autoFocus/>
            </div>
            <div className="form-field">
                <label>Password <sup style={{color:'red'}}>*</sup></label>
                <input type="password" value={password} onChange={(event) => { setPassword(event.target.value) }}/>
            </div>
        </>
    )
}

function SignInForm (props) {
    const { username, setUsermame} = useState('');
    const { password, setPassword} = useState('');
    const { confirmPassword, setConfirmPassword} = useState('');

    const handleValidate = () => {
        return (username && password && password == confirmPassword);
    }

    return (
        <>
            <div className="form-field">
                <label>Username <sup style={{color:'red'}}>*</sup></label>
                <input type="text" value={username} onChange={(event) => { setUsermame(event.target.value) }} autoFocus/>
            </div>
            <div className="form-field">
                <label>Password <sup style={{color:'red'}}>*</sup></label>
                <input type="password" value={password} onChange={(event) => { setPassword(event.target.value) }}/>
            </div>
            <div className="form-field">
                <label>Confirm Password <sup style={{color:'red'}}>*</sup></label>
                <input type="password" value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value) }}/>
            </div>
        </>
    )
}