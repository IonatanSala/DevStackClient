import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyAppliedPositions } from '../../actions/user';
import MyAppliedPositions from './MyAppliedPositions';

class MyAppliedPositionsContainer extends Component {
  componentDidMount = () => {
    this.props.getMyAppliedPositions();
  }

  render = () => {
    return (
      <MyAppliedPositions myAppliedPositions={this.props.myAppliedPositions} authenticated={this.props.authenticated} />
    );
  }
}

function mapStateToProps({ auth: { myAppliedPositions, authenticated }}) {
  return {
    myAppliedPositions,
    authenticated
  };
}

export default connect(mapStateToProps, { getMyAppliedPositions })(MyAppliedPositionsContainer);
