import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getOpportunities } from '../../actions/opportunities';
import LandingPage from './LandingPage';

class LandingPageContainer extends Component {
  componentWillMount = () => {
    if(this.props.authenticated) browserHistory.push('/dashboard');
  }

  componentDidMount = () => {
    this.props.getOpportunities();
  }

  render = () => {
    return (
      <LandingPage opportunities={this.props.opportunities} />
    );
  }
}
function mapStateToProps({ auth, opportunities: { all } }) {
  return {
    authenticated: auth.authenticated,
    opportunities: all
  };
}

export default connect(mapStateToProps, { getOpportunities })(LandingPageContainer);
