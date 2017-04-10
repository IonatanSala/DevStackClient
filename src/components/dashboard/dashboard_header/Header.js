import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from '../../../assets/logo.svg'

class Header extends Component {
  renderProfileHeader = () => {
      const profile = [
        {url: '/my-applied-positions', text: 'Positions Applied To'}
      ];

      let profileLinks;

      profileLinks = profile.map(s => (
        <Link to={`/dashboard${s.url}`} key={s.url} className="dashboard-header-link" activeClassName="active-header-link">{s.text}</Link>
      ));

      const indexRoute = <Link to="/dashboard" key="myProfile" className="dashboard-header-link" activeClassName={this.props.location.pathname !== '/dashboard' ? '' : 'active-header-link'} >My Profile</Link>;

      profileLinks.unshift(indexRoute);

      return profileLinks;
  }

  renderStoriesHeader = () => {
    const storyFilters = [
      {url: '?story=experience', text: 'Experience'},
      {url: '?story=education', text: 'Education'},
      {url: '?story=project', text: 'Project'},
      {url: '?story=volunteer', text: 'Volunteer'}
    ];

    let storyLinks;

    storyLinks = storyFilters.map(s => (
      <Link to={`/dashboard/stories${s.url}`} key={s.url} className="dashboard-header-link" activeClassName="active-header-link">{s.text}</Link>
    ))
    const allStories = <Link to="/dashboard/stories" key="?story=all" className="dashboard-header-link" activeClassName={this.props.location.query.story ? '' : 'active-header-link'} >All</Link>;

    storyLinks.unshift(allStories);

    return storyLinks;
  }

  renderOpportunitiesHeader = () => {
    const opportunities = [
      {url: '/new', text: 'Post Jobs'},
    ];

    let opportunityLinks;

    opportunityLinks = opportunities.map(s => (
      <Link
        to={`/dashboard/opportunities${s.url}`}
        key={s.url}
        className="dashboard-header-link"
        activeClassName="active-header-link"
      >
        {s.text}
      </Link>
    ))

    const jobListings = <Link to="/dashboard/opportunities" key="all" className="dashboard-header-link" activeClassName={this.props.location.pathname !== '/dashboard/opportunities' ? '' : 'active-header-link'} >My Job Listings</Link>;

    opportunityLinks.unshift(jobListings);

    return opportunityLinks;
  }

  renderHeader = () => {
    const pathname = this.props.location.pathname;

    if(pathname === '/dashboard/stories') {
      return this.renderStoriesHeader();
    } else if(pathname === '/dashboard/opportunities' || pathname === '/dashboard/opportunities/new') {
      return this.renderOpportunitiesHeader();
    } else if(pathname === '/dashboard' || pathname === '/dashboard/my-applied-positions') {
      return this.renderProfileHeader();
    }
  }

  render() {
    return (
      <header className="dashboard-header" >
        <nav className="left-nav">
          <Link to="/dashboard" className="dashboard-logo">
            <img src={logo} alt="logo" className="logo" />
          </Link>
          {this.renderHeader()}
        </nav>

        <nav className="right-nav">
          <Link to="/stories" className="dashboard-header-link">Settings</Link>
          <Link to="stories" className="profile-avatar">
            <img src="http://placehold.it/250x250" alt="Profile Avatar"/>
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
