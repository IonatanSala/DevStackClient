import React, { Component } from 'react';
import ChooseStoryType from './ChooseStoryType';
import StoryForm from './StoryForm';
import { submit } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Card, Steps } from 'antd';

const Step = Steps.Step;
class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storyType: 'experience',
      current: 0,
      steps: 2
    }
  }

  handleTypeClick = (storyType) => {
    this.setState({storyType});
  }

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev = () =>{
    const current = this.state.current - 1;
    this.setState({ current });
  }

  nextSection = () => {
    const newCurrentSection = this.state.storyType + 1;

    this.setState({ storyType: newCurrentSection });
  }

  handleSubmit = () => {
    // get form values based on storyType
    this.props.dispatch(submit(this.state.storyType));
  }

  renderStorySection = () => {
    const { current } = this.state;

    if(current === 0) {
      return <ChooseStoryType onClick={this.handleTypeClick} type={this.state.storyType}/>
    } else {
      return <StoryForm storyType={this.state.storyType} prevPage={this.prev}/>
    }
  }



  render() {
    const storyHeading = (this.state.current > 0) ? `Add Story(${this.state.storyType})`: 'Choose your story';

    return (
      <section className="create-story-container">
        <h2 className="story-heading">{storyHeading}</h2>
        <Card>
          <Steps size="small" current={this.state.current}>
            <Step title="Pick your Story" />
            <Step title="Complete Your Story" />
          </Steps>
          {this.renderStorySection()}
          <div className="steps-action">
          {
            this.state.current < this.state.steps - 1
            &&
            <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
        </div>
        </Card>
      </section>
    )
  }
}



function mapStateToProps({ form }) {
  return {
    form
  }
}

export default connect(mapStateToProps)(CreateStory);
