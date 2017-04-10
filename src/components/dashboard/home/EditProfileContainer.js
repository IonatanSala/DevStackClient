import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile, updateProfile } from '../../../actions/user';
import EditProfile from './EditProfile';

class EditProfileContainer extends Component {

  componentDidMount = () => {
    this.props.getProfile();
  }

  render = () => {
    const { profile } = this.props;
    return (
      <EditProfile initialValues={profile} profile={profile} onSubmit={this.props.updateProfile} />
    )
  }
}

function mapStateToProps({ auth: { profile }}) {
  return {
    profile
  };
}

export default connect(mapStateToProps, { getProfile, updateProfile })(EditProfileContainer);
