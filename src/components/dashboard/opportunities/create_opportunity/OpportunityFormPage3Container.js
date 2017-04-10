// keep for adding editor for description in the near future
import React, { Component } from 'react';
import OpportunityFormPage3 from './OpportunityFormPage3';

export default class OpportunityFormPage3Container extends {
  constructor(props) {
    super(props);
    this.state = {
      contentState: null,
      onContentStateChange: this.onContentStateChange
    };
  }

  onContentStateChange = (contentState) => {
    this.setState({
      contentState,
    });
  }

  render() {
    return (
      <OpportunityFormPage3
        {...this.state}
        {...this.props}
      />
    )
  }
}
