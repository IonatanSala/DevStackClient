import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { Icon, Tooltip } from 'antd';
import { Icon as FAIcon} from 'react-fa';

class Sidemenu extends Component {
  renderUserSidemenu = () => {
    const userMap = [
      {
        title: 'My Stories',
        to: '/dashboard/stories',
        iconType: 'book'
      },
      {
        title: 'Find Jobs',
        to: '/jobs',
        iconTypeFA: 'suitcase'
      }
    ];

    return userMap.map((u) => (
      <Tooltip key={u.title} placement="rightTop" title={u.title} arrowPointAtCenter>
        <Link to={u.to} className="dashboard-sidemenu-link" activeClassName="active-sidemenu-link">
          {u.iconType && <Icon type={u.iconType} /> }
          {u.iconTypeFA && <FAIcon size="2x" name={u.iconTypeFA} /> }
        </Link>
      </Tooltip>
    ));
  }

  renderEmployerSidemenu = () => {
    const employerMap = [
      {
        title: 'Jobs',
        to: '/dashboard/opportunities',
        iconTypeFA: 'suitcase'
      }
    ];

    return employerMap.map((u) => (
      <Tooltip key={u.title} placement="rightTop" title={u.title} arrowPointAtCenter>
        <Link to={u.to} className="dashboard-sidemenu-link" activeClassName="active-sidemenu-link">
          {u.iconType && <Icon type={u.iconType} /> }
          {u.iconTypeFA && <FAIcon size="2x" name={u.iconTypeFA} /> }
        </Link>
      </Tooltip>
    ));
  }

  renderSidemenu = () => {
    const isEmployer = localStorage.getItem('isEmployer');

    if(isEmployer === 'true') {
      return this.renderEmployerSidemenu()
    } else {
      return this.renderUserSidemenu();
    }
  }

  render() {
    return (
      <nav className="dashboard-sidemenu">
        <div className="dashboard-sidemenu-nav">
          <Tooltip placement="rightTop" title="Profile" arrowPointAtCenter>
            <IndexLink to="/dashboard" className="dashboard-sidemenu-link" activeClassName="active-sidemenu-link">
              <Icon type="user"></Icon>
            </IndexLink>
          </Tooltip>
          {this.renderSidemenu()}
        </div>
        <div className="dashboard-sidemenu-nav" >
          <Tooltip placement="rightTop" title="Sign Out" arrowPointAtCenter>
            <Link to="/signout" className="dashboard-sidemenu-link" activeClassName="active-sidemenu-link">
              <Icon type="logout" />
            </Link>
          </Tooltip>
        </div>
      </nav>
    );
  }
}

export default Sidemenu;
