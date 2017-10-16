import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import { Button, Input, Icon } from 'antd';
import LoginPanel from './login-panel';
import AuthService from '../../services/auth.service';
import Notification from '../../services/notification.service';

class Signup extends Component {
	state = {
		email: '',
		password: '',
		name: '',
		username: ''
	};

	_confirm = async(e) => {
		e.preventDefault();

		if(!this.state.name)
			return Notification.error('Please provide your name!');

		if(!this.state.username)
			return Notification.error('Please provide your username!');

		if(!this.state.password || this.state.password.length < 6)
			return Notification.error('Password must be longer than 6 characters!');

		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	if(!re.test(this.state.email))
  		return Notification.error('Invalid email!');

		AuthService.signup(this.state)
			.then((response) => {
				if(!response.success)
					return Notification.error(response.message);

				localStorage.userToken = response.data.token;
				localStorage.user = JSON.stringify(response.data.user);
				hashHistory.push('/');
			});
	};

	_handleChange = (e) => {
		if(e.target.id === 'username')
			return this._handleUsername(e);

		let updtObj = {};
		updtObj[e.target.id] = e.target.value;
		this.setState(updtObj);
	}

	_handleUsername = (e) => {
		var regex = /^[a-zA-Z\d\-_.,\s]+$/;
		
		if(!regex.test(e.target.value))
			e.target.value = e.target.value.substr(0, e.target.value.length -1);

		e.target.value = e.target.value.replace(' ', '-');
		let updtObj = {};
		updtObj[e.target.id] = e.target.value;
		this.setState(updtObj);
	}

	render() {
		return (
			<div className="row">
				<LoginPanel/>
				<form className="col-4 col-offset-1 row pd-10 pd-cl-v flex flex-center">
					<div>
						
						<label>Your Name</label>
						<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Name" type="text" size="large" className="full-width" onChange={(e) => this._handleChange(e)} id="name" />

						<label>Your Username</label>
						<Input prefix={<Icon type="idcard" style={{ fontSize: 13 }} />} placeholder="Username" type="text" size="large" className="full-width" onChange={(e) => this._handleChange(e)} id="username" />

						<label>Your email</label>
						<Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" type="email" size="large" className="full-width" onChange={(e) => this._handleChange(e)} id="email" />

						<label>Password</label>
						<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} className="full-width" onChange={(e) => this._handleChange(e)} id="password" type="password" size="large" placeholder="Password" />

						<div className="center-text">
							<Button type="primary" htmlType="submit" onClick={(e) => this._confirm(e)} size="large" className="full-width ma-10 ma-cl-h">Signup</Button>
							<div className="center-text login-hit">
								Have an account? <Link to="/login">Login</Link>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default Signup;