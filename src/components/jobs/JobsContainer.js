import React, { Component } from 'react';
import { connect } from 'react-redux';
import Jobs from './Jobs';

class JobsContainer extends Component {
  render = () => {
    return (
      <Jobs {...this.props} />
    )
  }
}

export default connect()(JobsContainer);
