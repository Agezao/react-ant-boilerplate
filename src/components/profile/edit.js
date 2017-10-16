import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Form, Icon, Input, Button } from 'antd';
import UserService from '../../services/user.service';
//
import './profile.scss';

class ProfileEdit extends Component {
	state = {
		user: {
      _id: this.props.params.user_id
    }
	};

	componentWillMount() {
    let that = this;
		UserService.get(this.props.params.user_id)
      .then((response) => {
        if(!response.success)
          return alert(response.message);

        that.setState({user: response.data});
      });
	}

  _updateUser = (e) => {
    UserService.save(this.state.user)
      .then((response) => {
        if(!response.success)
          alert('Erro ' + response.message);

        localStorage.user = JSON.stringify(this.state.user);
        hashHistory.push('/u/'+this.state.user.username);
      });
  }

  _handleChange = (e) => {
    let updtObj = this.state.user;
    updtObj[e.target.id] = e.target.value;
    this.setState(updtObj);
  }

  render() {
    return (
      <div className="container profile-edit">
        <div className="col-6 col-offset-3">
          <div className="col-12 row">
            <label>Username</label>
            <Form.Item hasFeedback validateStatus="success" className="ma-cl-v">
              <Input prefix={<Icon type="idcard" style={{ fontSize: 13 }} />} placeholder="Username" type="text" size="large" className="full-width" id="username" validateStatus="success" className="full-width" value={this.state.user.username} />
            </Form.Item>
            <small><i>* username cannot be changed</i></small>
          </div>
          <div className="col-12 row">
            <label>Name</label>
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Your Name" name="name" id="name" className="full-width" onChange={(e) => this._handleChange(e)} value={this.state.user.name} />
          </div>
          <div className="col-12 row" key="about">
            <label>About you</label>
            <Input.TextArea autosize={{ minRows: 4, maxRows: 8 }} onChange={(e) => this._handleChange(e)} value={this.state.user.about} name="about" id="about" className="full-width" />
          </div>
          <div className="col-12 center-text pd-5 pd-cl-h">
            <Button type="primary" icon="check" onClick={(e) => this._updateUser(e)}>Save</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
