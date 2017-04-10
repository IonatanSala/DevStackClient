import React, { Component } from 'react';
import Opportunities from './Opportunities';

class OpportunitiesContainer extends Component {
  render() {
    return (
      <Opportunities {...this.props} />
    );
  }
}

export default OpportunitiesContainer;
