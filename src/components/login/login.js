import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import { Button, Input, Icon } from 'antd';
import LoginPanel from './login-panel';
import AuthService from '../../services/auth.service';
import Notification from '../../services/notification.service';

class Login extends Component {
	state = {
		email: '',
		password: '',
		name: ''
	};

	_confirm = async(e) => {
		e.preventDefault();

		if(!this.state.email || !this.state.password)
			return Notification.error('Invalid Email or password!');

		AuthService.login({email: this.state.email, password: this.state.password})
			.then((response) => {
				if(!response.success)
					return Notification.error('Invalid Email or password!');

				localStorage.userToken = response.data.token;
				localStorage.user = JSON.stringify(response.data.user);
				hashHistory.push('/');
			});
	};

	_handleChange = (e) => {
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
						<label>Your email</label>
						<Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" type="email" size="large" className="full-width" onChange={(e) => this._handleChange(e)} id="email" />

						<label>Password</label>
						<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} className="full-width" onChange={(e) => this._handleChange(e)} id="password" type="password" size="large" placeholder="Password" />

						<div className="center-text">
							<Button type="primary" htmlType="submit" onClick={(e) => this._confirm(e)} size="large" className="full-width ma-10 ma-cl-h">Login</Button>
							<div className="login-hit">
								Don't have an account? <Link to="/login/signup">Signup</Link>
							</div>
							<div className="login-hit">
								<i>Forgot your password? <Link to="/login/recovery">Reset Password</Link></i>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default Login;