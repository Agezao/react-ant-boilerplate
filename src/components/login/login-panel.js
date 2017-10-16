import React, { Component } from 'react';

class LoginPanel extends Component {
  render() {
    return (
      <div className="center-text login-header col-6 flex flex-center">
        <div>
          <a className="bucket-logo"><img src="/images/logo.png" alt="App logo" /></a>
          <h3>starting point for a react app</h3>
        </div>
      </div>
    );
  }
}

export default LoginPanel;