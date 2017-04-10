import React from 'react';
import { Link } from 'react-router';
import { Button, Row, Col, Card, Icon } from 'antd';

const OpportunitiesList = ({ opportunities }) => {
  return (
    <section className="opportunities-list-container" >
      <Row gutter={16} type="flex" justify="start">
        <Col xs={24} sm={18} md={14}>
          {
            opportunities.map(o => (
              <Card key={o._id} >
                <Row className="job-card-title">
                  <Col>
                    <h1>{o.title}</h1>
                    <span>Created at </span>
                  </Col>
                </Row>
                <Row type="flex" align="bottom">
                  <Col xs={24} md={15} >
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
                  <Col xs={24} md={9} className="job-card-apply">
                    <Link to={`/jobs/${o._id}`} >
                      <Button type="primary" >View Your Listing</Button>
                    </Link>
                    <p>{o.applications.length} people have applied.</p>
                  </Col>
                </Row>
              </Card>
            ))
          }
        </Col>
      </Row>
    </section>
  )
}

export default OpportunitiesList;
