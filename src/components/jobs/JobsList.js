import React from 'react';
import { Row, Col, Card, Button, Icon } from 'antd';
import { Link } from 'react-router';
import { dateFromObjectId } from '../../helpers/dateFromObjectId';
import logo from '../../assets/logo.svg';

const JobsList = (props) => {
  return (
    <section className="jobs-list" >
      {!props.myAppliedPositions
        &&
        <header>
          <Row type="flex" justify="space-between" align="middle" className="job-list-header">
            <Col>
              <Row type="flex" justify="start" align="middle">
                <Col>
                  {props.authenticated && <Link to="/dashboard" ><Icon type="left" /> Back To Dashboard</Link>}
                  {!props.authenticated && <Link to="/" ><Icon type="left" /> Go Back</Link>}
                </Col>
              </Row>
            </Col>
            <Col>
              {!props.authenticated && <Link to="signin" >Sign In</Link>}
            </Col>
          </Row>
        </header>
      }

      <main>
        <Row gutter={16} type="flex" justify="center">
          <Col xs={24} sm={18} md={12}>
            {
              props.opportunities.map(o => (
                <Card key={o._id} className="job-card">
                  <Row className="job-card-title">
                    <Col>
                      <h1>{o.title}</h1>
                      <span>Created at {dateFromObjectId(o._id)}</span>
                    </Col>
                  </Row>
                  <Row type="flex" align="bottom">
                    <Col xs={24} md={18} >
                      <Row className="job-card-details">
                        <Col md={12} >
                          <h2>Company</h2>
                          <span>{o.company}</span>
                        </Col>
                        <Col xs={24} md={12} >
                          <h2>Location</h2>
                          <span>{o.location}</span>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={24} md={6} className="job-card-apply">
                      <Link to={`/jobs/${o._id}`} >
                        <Button type="primary" >Show More <Icon type="right" /></Button>
                      </Link>
                    </Col>
                  </Row>
                </Card>
              ))
            }
          </Col>
        </Row>
      </main>
    </section>
  );
}

export default JobsList;
