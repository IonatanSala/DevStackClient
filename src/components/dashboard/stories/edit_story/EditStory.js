import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button ,Row, Col, Card , Modal } from 'antd';
import ExperienceForm from '../create_story/ExperienceForm';
import EducationForm from '../create_story/EducationForm';
import ProjectForm from '../create_story/ProjectForm';
import VolunteerForm from '../create_story/VolunteerForm';
import moment from 'moment';
const confirm = Modal.confirm;

const EditStory = (props) => {
  let story;
  if(props.story) {
    story = props.story[props.story.type]
    if(story.from) {
      story.from = moment(story.from);
      story.to = moment(story.to);
    }
  }

  function showDeletePopup() {
    confirm({
      title: 'Delete This Story?',
      content: 'Are you sure you want to delete this story? It will be permanently removed.',
      okText: 'Delete',
      onOk() {
        props.handleRemove()
      },
      onCancel() {},
    });
  }

  return (
    <section className="story-form">
      <Row type="flex" justify="center" align="middle">
        <Col xs={24} md={20}>
          <Card title="Edit Your Story" extra={<Button type="danger" onClick={showDeletePopup}>Delete Story</Button>}>
            {props.story && props.story.type === 'experience' && <ExperienceForm editPage initialValues={story} onSubmit={props.handleUpdate} />}
            {props.story && props.story.type === 'education' && <EducationForm editPage initialValues={story} onSubmit={props.handleUpdate} /> }
            {props.story && props.story.type === 'project' && <ProjectForm editPage initialValues={story} onSubmit={props.handleUpdate} /> }
            {props.story && props.story.type === 'volunteer' && <VolunteerForm editPage initialValues={story} onSubmit={props.handleUpdate} /> }
          </Card>
        </Col>
      </Row>
    </section>
  );
}

export default EditStory;
