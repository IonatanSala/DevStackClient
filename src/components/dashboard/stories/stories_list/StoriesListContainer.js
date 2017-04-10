import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StoriesList from './StoriesList';
import { getStories, setCurrentStoryToNull } from '../../../../actions/stories';

class StoriesListContainer extends Component {
  componentDidMount = () => {
    this.props.getStories();
    this.props.setCurrentStoryToNull();
  }

  filterStories = () => {
    let stories = this.props.stories;
    const filterBy = this.props.location.query.story;

    if(!filterBy || !stories) {
      return stories;
    }

    return stories.filter((s) => s.type === filterBy);
  }

  render() {
    return <StoriesList stories={this.filterStories()} />
  }
}

function mapStateToProps({ story }) {
  return {
    stories: story.all
  }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ getStories, setCurrentStoryToNull }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(StoriesListContainer);
