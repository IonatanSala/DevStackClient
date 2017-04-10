import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createOpportunity } from '../../../../actions/opportunities';
import OpportunityWizardForm from './OpportunityWizardForm';

class OpportunityWizardFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      nextPage: this.nextPage,
      prevPage: this.prevPage
    };
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1});
  }

  prevPage = () => {
    this.setState({ page: this.state.page - 1});
  }

  render() {
    return (
      <OpportunityWizardForm {...this.state} onSubmit={this.props.onSubmit} />
    )
  }
}


export default connect(null, { onSubmit: createOpportunity })(OpportunityWizardFormContainer);
