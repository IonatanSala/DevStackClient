import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../../actions/user';
import { getStories } from '../../../actions/stories';
import Profile from './Profile';

class ProfileContainer extends Component {

  componentDidMount = () => {
    this.props.getProfile();
    this.props.getStories();
  }

  render() {
    return (
      <Profile {...this.props} />
    );
  }
}

function mapStateToProps({ auth: { user, profile }, story: { all }}) {
  return {
    user,
    profile,
    stories: all,
  };
}

export default connect(mapStateToProps, { getProfile, getStories })(ProfileContainer);
