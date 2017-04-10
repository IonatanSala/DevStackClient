import React from 'react';
import { Affix, Col, Card, Row, Button, Tag } from 'antd';
import { Link } from 'react-router';
import logo from '../../../../assets/logo.svg'

const Opportunity = ({ opportunity, authenticated, createOpportunityApplication, isCreator, ...props }) => {
  return (
    <section className="opportunity-container" >
      <Affix>
        <header className="opportunity-header" >
          <Row type="flex" justify="space-between" align="middle">
            <Col xs={12}>
              <Row type="flex" justify="start" align="middle" >
                <img src={logo} className="logo" alt="logo" />
              </Row>
            </Col>
            <Col xs={12}>
              <Row type="flex" justify="end" align="middle" >
                <Col>
                  {!authenticated && <Link to="/signin" type="primary"><Button type="primary">Sign in to apply for jobs</Button></Link>}
                  {(authenticated && !isCreator) &&<Button type="primary" onClick={() => createOpportunityApplication(opportunity._id)}>Apply</Button>}
                  {
                    isCreator
                    &&
                    <Link to={`/dashboard/opportunities/${opportunity._id}/edit`} >
                      <Button type="default">Edit Listing</Button>
                    </Link>
                  }
                </Col>
              </Row>
            </Col>
          </Row>
        </header>
      </Affix>
      <main className="opportunity-main-content" >
        <Row gutter={8} type="flex" justify="center">
          <Col xs={24} sm={18} md={12}>
            <Card>
              <header>
                <Row type="flex" justify="center" align="center">
                  <Col xs={24}>
                    <h1>{opportunity.title}</h1>
                    <h3>{opportunity.company} - {opportunity.location}</h3>
                    <p>{opportunity.jobType}</p>
                  </Col>
                </Row>
                <hr />
              </header>
              <div className="job-skills">
                {opportunity.skills && opportunity.skills.map(s => <Tag color="blue" key={s} >{s}</Tag>)}
              </div>
              <div dangerouslySetInnerHTML={{__html: opportunity.description }} />
            </Card>
          </Col>
        </Row>
      </main>
    </section>
  )
}

export default Opportunity;
