import React, { Component } from 'react';
import { connect } from 'react-redux';
import OpportunitiesList from './OpportunitiesList';
import { getMyOpportunities, setCurrentOpportunityToNull } from '../../../../actions/opportunities';

class OpportunitiesListContainer extends Component {
  componentDidMount = () => {
    this.props.getMyOpportunities();
    this.props.setCurrentOpportunityToNull()
  }

  render() {
    return (
      <OpportunitiesList opportunities={this.props.opportunities} />
    );
  }
}

function mapStateToProps({ opportunities: { myOpportunities }}) {
  return {
    opportunities: myOpportunities
  };
}
export default connect(
  mapStateToProps,
  {
    getMyOpportunities,
    setCurrentOpportunityToNull 
})(OpportunitiesListContainer);
