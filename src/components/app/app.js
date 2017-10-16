import React, { Component } from 'react';
import Topbar from '../topbar/topbar';
import Alert from 'react-s-alert';
import AOS from 'aos';
//
import 'aos/dist/aos.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
//
import './app.scss';
//

class App extends Component {
  render() {

    AOS.init({
      once: true,
      duration: 550
    });
    
    return (
      <div className="row full-width pd-cl-h">
        <Topbar />
        
        <div className="row col-12 app-container">
          {this.props.children}
        </div>

        <Alert stack={{limit: 3}} effect='slide' position='top-right' timeout={5000} />
      </div>
    );
  }
}

export default App;
