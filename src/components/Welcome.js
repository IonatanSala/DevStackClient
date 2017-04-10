import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';

class Welcome extends Component {

  componentWillMount() {
    if(this.props.authenticated) browserHistory.push('/dashboard/stories')
  }

  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <Link to="/signin" >Sign in</Link>
        <Link to="/signup" >Sign up</Link>
      </div>
    )
  }
}

function mapStateToProps({auth}) {
  return {
    authenticated: auth.authenticated
  };
}

export default connect(mapStateToProps)(Welcome);
