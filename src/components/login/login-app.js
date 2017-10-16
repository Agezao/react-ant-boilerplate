import React, { Component } from 'react';
import Alert from 'react-s-alert';
//
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './login.scss';

class LoginApp extends Component {
  render() {
    return (
      <div className="row login-app">
        {this.props.children}

        <Alert stack={{limit: 3}} effect='slide' position='top-right' timeout={5000} />
      </div>
    );
  }
}

export default LoginApp;
