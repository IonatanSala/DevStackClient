import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signOutUser } from '../../actions';

class SignOut extends Component {

  componentWillMount() {
    this.props.signOutUser();
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
        Sorry to see you go..
      </div>
    );
  }
}


export default connect(null, { signOutUser })(SignOut);
