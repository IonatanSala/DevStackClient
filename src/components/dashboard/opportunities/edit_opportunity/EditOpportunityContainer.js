import React, { Component } from 'react'
import { connect } from 'react-redux';
import EditOpportunity from './EditOpportunity';
import { getOpportunity, updateOpportunity, removeOpportunity } from '../../../../actions/opportunities';

class EditOpportunityContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      nextPage: this.nextPage,
      prevPage: this.prevPage
    };
  }

  componentDidMount = () => {
    this.props.getOpportunity(this.props.params.id);
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1});
  }

  prevPage = () => {
    this.setState({ page: this.state.page - 1});
  }

  handleRemove = () => {
    const { id } = this.props.params;
    this.props.removeOpportunity(id);
  }

  render = () => {
    console.log(this.props.opportunity);

    return (
      <EditOpportunity {...this.state} onSubmit={this.props.updateOpportunity} initialValues={this.props.opportunity} handleRemove={this.handleRemove}/>
    )
  }
}

function mapStateToProps({ opportunities: { current }}) {
  return {
    opportunity: current
  }
}

export default connect(mapStateToProps, { getOpportunity, updateOpportunity, removeOpportunity })(EditOpportunityContainer);
