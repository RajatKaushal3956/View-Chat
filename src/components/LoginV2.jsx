import React, { useRef } from 'react';

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
    const usernameFieldRef = useRef();
    const passwordFieldRef = useRef();

    const handleValidate = () => {
        const username = usernameFieldRef.current,
            password = passwordFieldRef.current;

        let valid = false;

        if('value' in username && username.value) {
            valid = true;
        }

        if(password.value) {
            valid = valid && true;
        } else {
            valid = false;
        }

        return valid;
    }

    return (
        <>
            <div className="form-field">
                <label>Username <sup style={{color:'red'}}>*</sup></label>
                <input ref={usernameFieldRef} type="text" name="name" autoFocus/>
            </div>
            <div className="form-field">
                <label>Password <sup style={{color:'red'}}>*</sup></label>
                <input ref={passwordFieldRef} type="password" name="room"/>
            </div>
        </>
    )
}

function SignInForm (props) {
    const usernameFieldRef = useRef();
    const passwordFieldRef = useRef();
    const confirmPasswordFieldRef = useRef();

    const handleValidate = () => {
        const username = usernameFieldRef.current,
            password = passwordFieldRef.current,
            confirmPassword = confirmPasswordFieldRef.current;

        let valid = false;

        if('value' in username && username.value) {
            valid = true;
        }

        if((password.value && confirmPassword.value) && (password.value === confirmPassword.value)) {
            valid = valid && true;
        } else {
            valid = false;
        }

        return valid;
    }

    return (
        <>
            <div className="form-field">
                <label>Username <sup style={{color:'red'}}>*</sup></label>
                <input ref={usernameFieldRef} type="text" name="name" autoFocus/>
            </div>
            <div className="form-field">
                <label>Password <sup style={{color:'red'}}>*</sup></label>
                <input ref={passwordFieldRef} type="password" name="room"/>
            </div>
            <div className="form-field">
                <label>Confirm Password <sup style={{color:'red'}}>*</sup></label>
                <input ref={confirmPasswordFieldRef} type="password" name="room"/>
            </div>
        </>
    )
}