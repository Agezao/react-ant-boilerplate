import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import { Button, Input, Icon } from 'antd';
import LoginPanel from './login-panel';
import AuthService from '../../services/auth.service';
import Notification from '../../services/notification.service';

class Recovery extends Component {
	state = {
    email: '',
    recovered: false
	};

	_confirm = async(e) => {
		e.preventDefault();
    let emailregex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if(!this.state.email || !emailregex.test(this.state.email))
			return Notification.error('Invalid Email!');
    
    let that = this;
		AuthService.recovery({email: this.state.email})
			.then((response) => {
        if(!response.success)
					return Notification.error(response.message);

				that.setState({recovered: true});
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
						<h3>Password Recovery</h3>

            {this.state.recovered 
            ? <h6>Email sent! Check your email.</h6>
            : 
              <div>
                <label>Your email</label>
                <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" type="email" size="large" className="full-width" onChange={(e) => this._handleChange(e)} id="email" />
                  
                <div className="center-text">
									<Button type="primary" htmlType="submit" onClick={(e) => this._confirm(e)} size="large" className="full-width ma-10 ma-cl-h">Send recovery email</Button>
                  <div className="login-hit">
                    Don't have an account? <Link to="/login/signup">Signup</Link>
                  </div>
                </div>
              </div>
            }
					</div>
				</form>
			</div>
		);
	}
}

export default Recovery;