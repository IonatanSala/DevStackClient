import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Menu } from 'antd';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 'home'
    }
  }

  renderLinks() {
    if(this.props.authenticated) {
      // show a link to sign out
      return (
        <Menu.Item key="signout">
          <Link to="/signout">Sign Out</Link>
        </Menu.Item>
      );

    } else {
      return [
        <Menu.Item key="signin">
          <Link to="/signin">Sign In</Link>
        </Menu.Item>,
        <Menu.Item key="signout">
          <Link to="/signup">Sign Up</Link>
        </Menu.Item>
      ];
    }
  }

  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick.bind(this)}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        theme="dark"
        >
        <Menu.Item key="home">
          <Link to="/">Redux Auth</Link>
        </Menu.Item>
        {this.renderLinks()}
      </Menu>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
