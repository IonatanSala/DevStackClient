import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobsList from './JobsList';
import { getOpportunities } from '../../actions/opportunities';

class JobsListContainer extends Component {
  componentDidMount = () => {
    this.props.getOpportunities();
  }

  render = () => {
    const { opportunities, authenticated } = this.props;

    return (
      <JobsList opportunities={opportunities} authenticated={authenticated}/>
    );
  }

}

function mapStateToProps({ auth: { authenticated }, opportunities: { all }}) {

  return {
    opportunities: all,
    authenticated
  };
}


export default connect( mapStateToProps, { getOpportunities })(JobsListContainer);
