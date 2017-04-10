import React from 'react';

const VolunteerStory = ({story}) => {
  console.log(story);
  return (
    <div>
      {story.organization}
    </div>
  )
}

export default VolunteerStory;
