import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { Menu, Icon, Button } from 'antd';
import UserService from '../../services/user.service';
import './topbar.scss';

class Topbar extends Component {
	state = {
		searchOpened: false,
		menuOpened: false,
		auth: false,
		user: null
	};

	componentWillMount() {
		this.setState({auth: true, user: UserService.local()});
	}

	_logout = (e) => {
		if(this.state.auth)
			localStorage.clear();
		hashHistory.push('/login');
	};

	_toggleResponsive = (e) => {
		if(e && e.key) {
			if(e.key[0] == '/')
				hashHistory.push(e.key);

			switch(e.key) {
				case 'logout':
					this._logout();
				break;
				case 'github':
					window.open('https://github.com/Agezao')
				break;
			}
		}

		this.state.menuOpened = !this.state.menuOpened;
    this.setState(this.state);
	};

	_toggleSearch = (e) => {
		this.state.searchOpened = !this.state.searchOpened;
		this.setState(this.state);

		if(this.state.searchOpened)
			setTimeout("document.getElementById('searchInput').focus();",50);
	}

	_search = () => {};

	render() {
		return (
			<header>
        <div className="col-12 logo pd-20 pd-cl-v">
          <div className={this.state.menuOpened ? "burger open" : "burger"} onClick={this._toggleResponsive}>
          	<div className="burger__patty"></div><div className="burger__patty"></div><div className="burger__patty"></div>
        	</div>

          <Link to='/' className="navbar-brand"><img src="/images/logo.png" /></Link>

        	{/* Menu */}
					<div className={this.state.menuOpened ? "hiddenMenu active" : "hiddenMenu"}>
						<Menu onClick={this._toggleResponsive} className="full-width" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
							<Menu.Item key="/">
								<Icon type="home" />
								<span>Home</span>
							</Menu.Item>
							<Menu.Item key={"/u/"+this.state.user.username}>
								<Icon type="user" />
								<span>Your Profile</span>
							</Menu.Item>
							<Menu.Item key="/about">
								<Icon type="info-circle-o" />
								<span>About</span>
							</Menu.Item>
							<Menu.Item key="github">
								<Icon type="github" />
								<span>Github</span>
							</Menu.Item>
							<Menu.Item key="logout">
								<Icon type="logout" />
								<span>Logout</span>
							</Menu.Item>
						</Menu>
					</div>
        </div>
    	</header>
		)
	}
}

export default Topbar;