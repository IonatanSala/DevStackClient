import React, { Component } from 'react';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import ProjectForm from './ProjectForm';
import VolunteerForm from './VolunteerForm';
import { createStory } from '../../../../actions/stories';


class StoryForm extends Component {
  renderForm() {
    const { storyType, prevPage } = this.props;
    switch (storyType) {
      case 'experience':
        return <ExperienceForm prevPage={prevPage} onSubmit={createStory} />
      case 'education':
        return <EducationForm prevPage={prevPage} onSubmit={createStory} />
      case 'project':
        return <ProjectForm prevPage={prevPage} onSubmit={createStory} />
      case 'volunteer':
        return <VolunteerForm prevPage={prevPage} onSubmit={createStory} />
      default:
        return <h1>No form found</h1>;
    }
  }

  render() {
    return (
      <section className="story-form">
        {this.renderForm()}
      </section>
    )
  }

}

export default StoryForm;
