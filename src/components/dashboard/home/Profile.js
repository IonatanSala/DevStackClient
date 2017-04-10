import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Card, Icon } from 'antd';
import moment from 'moment';

const Profile = (props) => {
  console.log(props.stories);
  if(!props.profile) return null;
  return (
    <section className="profile-container">
      <Row type="flex" justify="center">
        <Col xs={24} md={14}>
          <Card className="user-headline" extra={<Link className="profile-cards-icon" to="/dashboard/profile/edit"><Icon type="edit"/></Link>}>
            <h1>{props.profile.firstName + " " + props.profile.lastName}</h1>
            <h2>{props.profile.headline}</h2>
            <p>{props.profile.summary}</p>
          </Card>
        </Col>
      </Row>
      {_renderStories()}
    </section>
  )

  function _renderStories() {
    if(!props.stories) return null;
    let experienceArray = [],
        educationArray = [],
        projectArray = [],
        volunteerArray = [];
    props.stories.map(s => {
      const storyType = s.type;
      const story = s[storyType];
      if(storyType === 'experience') {
        const currentStory = (
          <div key={s._id}>
            <h3>{story.title}</h3>
            <h4>{`${moment(story.from).format('MMM Do YYYY')} - ${moment(story.from).format('MMM Do YYYY')}`}</h4>
            <p>{story.description}</p>
            <hr />
          </div>
        );
        experienceArray.push(currentStory);
      } else if(storyType === 'education') {
        const currentStory = (
          <div key={s._id}>
            <h3>{story.name}</h3>
            <h4>{`${moment(story.from).format('MMM Do YYYY')} - ${moment(story.to).format('MMM Do YYYY')}`}</h4>
            <p>{story.degree} - {story.fieldOfStudy}</p>
            <hr />
          </div>
        );
        educationArray.push(currentStory);
      } else if(storyType === 'project') {
        const currentStory = (
          <div key={s._id}>
            <h3>{story.title}</h3>
            <h4>{`${moment(story.from).format('MMM Do YYYY')} - ${moment(story.to).format('MMM Do YYYY')}`}</h4>
            <p>{story.description}</p>
            <hr />
          </div>
        );
        projectArray.push(currentStory);
      } else if(storyType === 'volunteer') {
        const currentStory = (
          <div key={s._id}>
            <h3>{story.organization}</h3>
            <h4>{`${moment(story.from).format('MMM Do YYYY')} - ${moment(story.to).format('MMM Do YYYY')}`}</h4>
            <p>{story.description}</p>
            <hr />
          </div>
        );
        volunteerArray.push(currentStory);
      }
    });

    let allStories = (
      <Row type="flex" justify="center">
        <Col xs={24} md={14}>
          <Card title="Experience" extra={<Link className="profile-cards-icon" to="dashboard/stories/new" ><Icon type="plus"/></Link>}>
            {experienceArray}
          </Card>
          <Card title="Education" extra={<Link className="profile-cards-icon" to="dashboard/stories/new" ><Icon type="plus"/></Link>}>
            {educationArray}
          </Card>
          <Card title="Project" extra={<Link className="profile-cards-icon" to="dashboard/stories/new" ><Icon type="plus"/></Link>}>
            {projectArray}
          </Card>
          <Card title="Volunteer" extra={<Link className="profile-cards-icon" to="dashboard/stories/new" ><Icon type="plus"/></Link>}>
            {volunteerArray}
          </Card>
        </Col>
      </Row>
    );
    return allStories;
  }
}

export default Profile;
