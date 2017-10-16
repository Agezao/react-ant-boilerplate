import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import { Button, Input, Icon } from 'antd';
import LoginPanel from './login-panel';
import AuthService from '../../services/auth.service';
import Notification from '../../services/notification.service';

class Reset extends Component {
	state = {
    password: '',
    recovered: false
	};

	_confirm = async(e) => {
		e.preventDefault();

		if(!this.state.password || this.state.password.length < 6)
      return Notification.error('Password must be longer than 6 characters!');
    
    let that = this;
		AuthService.updatePassword({password: this.state.password, recoveryCode: this.props.params.recovery_code})
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
						<h3>Reset your password</h3>

            { this.state.recovered 
            ? <h6 className="center-text">Password updated. You can now <Link to="/login">log in</Link></h6>
            :
              <div>
                <label>New password</label>
								<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} className="full-width" onChange={(e) => this._handleChange(e)} id="password" type="password" size="large" placeholder="New password" />
                
                <div className="center-text">
									<Button type="primary" htmlType="submit" onClick={(e) => this._confirm(e)} size="large" className="full-width ma-10 ma-cl-h">Change password</Button>
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

export default Reset;