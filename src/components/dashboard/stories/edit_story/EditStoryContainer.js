import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditStory from './EditStory';
import { getStory, updateStory, removeStory } from '../../../../actions/stories';

class EditStoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.id
    }
  }
  componentDidMount = () => {
    const { id } = this.state;
    this.props.getStory(id);
  }

  handleUpdate = (story) => {
    const { id } = this.state;
    this.props.updateStory(id, story);

  }

  handleRemove = () => {
    const { id } = this.state;
    this.props.removeStory(id);
  }

  render = () => {
    return (
      <EditStory story={this.props.story} handleUpdate={this.handleUpdate} handleRemove={this.handleRemove}/>
    )
  }
}

function mapStateToProps({ story: { current }}) {
  return {
    story: current
  };
}

export default connect(mapStateToProps, { getStory, updateStory, removeStory })(EditStoryContainer);
