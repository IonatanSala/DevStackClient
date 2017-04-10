import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Story from './Story';
import { getStory } from '../../../../actions/stories';

class StoryContainer extends Component {

  componentDidMount = () => {
    const storyID = this.props.params.id;
    this.props.getStory(storyID);
  }

  render() {
    return (
      <Story story={this.props.story} />
    )
  }
}

function mapStateToProps({ story }) {
  return {
    story: story.current
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getStory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryContainer);
