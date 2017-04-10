import React from 'react';
import { Link } from 'react-router';
import { Card, Col, Icon, Row } from 'antd'
import moment from 'moment';

const StoriesList = (props) => {
//   <Icon type="team" />;
// <Icon type="book" />;
// <Icon type="rocket" />;
// <Icon type="heart-o" />;


  function renderCard(story) {
    const storyType = story.type
    const s = story[storyType];
    let footer = null;
    // let cardSkills = null;
    let storyTypeIcon = null;
    let mainCardContent = {
      title: null,
      subTitle: null
    };


    // <footer>
    //   <div className="story-card-time">
    //     <span>{moment(story[story.type].from).format('MMM YYYY')}</span>
    //     <Icon type="arrow-right" />
    //     <span>{moment(story[story.type].to).format('MMM YYYY')}</span>
    //   </div>
    //   <div className="story-card-skills">
    //     <Tooltip placement="bottom" title="test">
    //       <Icon type="switcher" />
    //     </Tooltip>
    //   </div>
    // </footer>


    if(storyType === 'education') {
      mainCardContent.title = s.fieldOfStudy;
      mainCardContent.subTitle = s.name;
      storyTypeIcon = <Icon type="book" />;
      footer = (
        <footer>
          <div className="story-card-time">
            <span>{moment(story[story.type].from).format('MMM YYYY')}</span>
            <Icon type="arrow-right" />
            <span>{moment(story[story.type].to).format('MMM YYYY')}</span>
          </div>
          <div className="story-card-skills">
            <Icon type="switcher" />
          </div>
        </footer>
      );

    } else if(storyType === 'experience') {
      mainCardContent.title = s.title;
      mainCardContent.subTitle = s.companyName;
      storyTypeIcon = <Icon type="team" />;
      footer = (
        <footer>
          <div className="story-card-time">
            <span>{moment(story[story.type].from).format('MMM YYYY')}</span>
            <Icon type="arrow-right" />
            <span>{moment(story[story.type].to).format('MMM YYYY')}</span>
          </div>
          <div className="story-card-skills">
            <Icon type="switcher" />
          </div>
        </footer>
      )

    } else if(storyType === 'project') {
      mainCardContent.title = s.title;
      mainCardContent.subTitle = s.url;
      storyTypeIcon = <Icon type="rocket" />;
      footer = (
        <footer>
          <div className="story-card-time">
            <span>{moment(story[story.type].from).format('MMM YYYY')}</span>
            <Icon type="arrow-right" />
            <span>{moment(story[story.type].to).format('MMM YYYY')}</span>
          </div>
          <div className="story-card-skills">
            <Icon type="switcher" />
          </div>
        </footer>
      )

    } else if(storyType === 'volunteer') {
      mainCardContent.title = s.organization;
      mainCardContent.subTitle = s.role;
      storyTypeIcon = <Icon type="heart-o" />;
      footer = (
        <footer>
          <div className="story-card-time">
            <span>{moment(story[story.type].from).format('MMM YYYY')}</span>
            <Icon type="arrow-right" />
            {(s.stillThere) ? <span>Present</span>: <span>{moment(story[story.type].to).format('MMM YYYY')}</span>}
          </div>
          <div className="story-card-skills">
            <Icon type="switcher" />
          </div>
        </footer>
      )
    }



    return (
      <Link to={`/dashboard/stories/${story._id}/edit`} className="dashboard-header-link">
        <Card className="card-link story-card" >
          <header className="story-card-icon">
            {storyTypeIcon}
          </header>
          <section>
            <div className="main-card-content">
              <h2>{mainCardContent.title}</h2>
              <p>{mainCardContent.subTitle}</p>
            </div>
            {footer}
          </section>
        </Card>
      </Link>
    );

  }

  function renderStories() {
    let stories;
    if(props.stories) {
      stories = (
        <Row gutter={24} justify="space-between" >
          <Col xs={24} sm={12} md={6} className="p-b-3">
            <Link to={`/dashboard/stories/new`} className="dashboard-header-link">
              <Card className="add-story-card card-link">
                <Icon type="plus"/>
                <h2>New Story</h2>
              </Card>
            </Link>

          </Col>
          {props.stories.map(s => (
            <Col key={s._id} xs={24} sm={12} md={6} className="p-b-3" >
              {renderCard(s)}
            </Col>
          ))}
        </Row>
      );
    } else {
      stories = (
        <Row gutter={8} justify="space-between" >
          <Col xs={24} sm={12} md={6} className="p-b-1" >
            <Card loading title="Loading Stories..." />
          </Col>
        </Row>
      );
    }

    return stories;
  }

  return (
    <section className="stories-list">
      {renderStories()}
    </section>
  );
}

export default StoriesList;
