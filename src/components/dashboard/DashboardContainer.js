import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';

class DashboardContainer extends Component {
  render() {
    return (
      <Dashboard {...this.props }/>
    );
  }
}

function mapStateToProps({auth: { user }}) {
  return {
    user
  }
}
export default connect(mapStateToProps)(DashboardContainer);
