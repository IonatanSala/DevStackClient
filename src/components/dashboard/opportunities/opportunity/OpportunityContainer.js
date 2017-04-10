import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOpportunity, isOpportunityCreator, setCreatorToFalse } from '../../../../actions/opportunities';
import { createOpportunityApplication } from '../../../../actions/opportunityApplications';
import Opportunity from './Opportunity';

class OpportunityContainer extends Component {
  componentDidMount = () => {
    const { id } = this.props.params;
    this.props.getOpportunity(id);
    if(this.props.authenticated) {
      this.props.isOpportunityCreator(id);
    }
  }

  componentWillUnmount = () => {
    this.props.setCreatorToFalse();
  }

  render = () => {
    const { opportunity, authenticated, createOpportunityApplication, isCreator } = this.props;
    return (
      <Opportunity
        opportunity={opportunity}
        authenticated={authenticated}
        createOpportunityApplication={createOpportunityApplication}
        isCreator={isCreator} />
    );
  }
}


function mapStateToProps({ auth: { authenticated }, opportunities: { current, isCreator }}) {
  return {
    opportunity: current,
    authenticated,
    isCreator
  };
}

export default connect(mapStateToProps, { getOpportunity, createOpportunityApplication, isOpportunityCreator, setCreatorToFalse })(OpportunityContainer)
