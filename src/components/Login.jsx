import React, { Component } from 'react';
import $ from 'jquery';
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            signIn: this.props.match.path === '/SignUp' ? true : false
        }
        this.flag = false;
    }
    validation = (e) =>{
        let username = document.getElementById('username'),
            password = document.getElementById('password'),
            confirm = document.getElementById('confirm_password'),
            valid = false;
        if(username.value){
            valid = true;
        }
        if(this.state.signIn){
            if((password.value && confirm.value) && (password.value === confirm.value)) {
                valid = valid && true;
            } else {
                valid = false;
            }
        } else {
            if(password.value) {
                valid = valid && true;
            } else {
                valid = false;
            }
        }
        return valid;
    }
    join = (e) => {
        let data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value 
        },
        method = this.state.signIn ? 'POST' : 'GET';
        $('#loginButton').prop('disabled','true');
        $.ajax({
            url: 'http://localhost/User',
            method: method,
            data:{
                data:JSON.stringify(data)
            },
            success:(response)=>{
                let flag = false;
                if(!this.state.signIn) {
                    if(response.exists) {
                        flag = true;
                    }
                } else if(response.status_code && response.status_code === '201') {
                    flag = true;
                }
                if(flag){
                    let a = JSON.stringify(response.token);
                    document.cookie = `jwt_token=${a}`;
                    this.props.history.push({
                        pathname: `/Dashboard`,
                        username: a.username
                    });
                } else {
                    console.log('error occured');
                }
                $(`#loginButton`).removeAttr('disabled');
            }
        });
        
    }

    componentWillMount() {
        if(document.cookie.indexOf('jwt_token') != -1) {
            console.log('object', document.cookie.indexOf('jwt_token'))
            window.location.href = '/Dashboard';
        }
    }
  render() {
      let me = this;
    return (
        <div className="centered-form">
            <div className="centered-form__form">
                <div className="form-field">
                    <h3>{me.state.signIn ? 'Signin' : 'Login'}</h3>
                </div>
                <div className="form-field">
                    <label>Username <sup style={{color:'red'}}>*</sup></label>
                    <input id='username' type="text" name="name" autoFocus/>
                </div>
                <div className="form-field">
                    <label>Password <sup style={{color:'red'}}>*</sup></label>
                    <input id='password' type="password" name="room"/>
                </div>
                {
                    me.state.signIn ? 
                    <div className="form-field">
                        <label>Confirm Password <sup style={{color:'red'}}>*</sup></label>
                        <input id='confirm_password' type="password" name="room"/>
                    </div>
                    : ''
                }
                <div className="form-field">
                    <button 
                        onClick={()=>{
                            if(me.validation()) {
                                me.join();
                            }
                        }} id='loginButton'>{me.state.signIn ? 'Join' : 'Login'}</button>
                </div>
            </div>
        </div>
    );
  }
}
export default Login;
