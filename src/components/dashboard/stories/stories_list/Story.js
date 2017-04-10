import React from 'react';
import EducationStory from './EducationStory';
import ExperienceStory from './ExperienceStory';
import ProjectStory from './ProjectStory';
import VolunteerStory from './VolunteerStory';

const Story = ({story}) => {

  function renderStory() {
    if(story) {
      switch (story.type) {
        case 'education':
          return <EducationStory story={story[story.type]} />;
        case 'experience':
          return <ExperienceStory story={story[story.type]} />;
        case 'project':
          return <ProjectStory story={story[story.type]} />;
        case 'volunteer':
          return <VolunteerStory story={story[story.type]} />;
        default:
          return null    
      }
    } else {
      return null
    }
  }

  return (
    <section className="story-container">
      {renderStory()}
    </section>
  );
}

export default Story;
