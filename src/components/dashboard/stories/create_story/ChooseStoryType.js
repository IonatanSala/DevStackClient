import React, { Component } from 'react';
import {Col, Icon, Row} from 'antd';

const storyTypes = ['experience', 'education', 'project', 'volunteer'];

class ChooseStoryType extends Component {
  renderTypes = () => {

    return storyTypes.map((t, i) => {
      function renderIcon() {
        if(t === 'experience') {
          return <Icon type="team" />;
        } else if(t === 'education') {
          return <Icon type="book" />;
        } else if(t === 'project') {
          return <Icon type="rocket" />;
        } else {
          return <Icon type="heart-o" />;
        }
      }

      return (
        <Col
          span={5}
          key={i}
          onClick={() => this.props.onClick(t) }
          className={`story-type ${(this.props.type === t) ? 'active-story-type': ''}`}
          >
          { renderIcon() }
          <div className="story-type-info">
            <h3>{t}</h3>
            {t === 'experience' && <small>Add a job experience to your profile</small>}
            {t === 'education' && <small>Add your education qualification here</small>}
            {t === 'project' && <small>Add any projects you have worked on here.</small>}
            {t === 'volunteer' && <small>Add any volunteering work.</small>}
          </div>
        </Col>
      );
    });
  }

  render() {
    return (
      <section className="story-types">
          <Row type="flex" justify="space-between">
            {this.renderTypes()}
          </Row>
      </section>
    );
  }
}


export default ChooseStoryType;
