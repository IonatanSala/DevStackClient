import React from 'react';
import { Link } from 'react-router';
import landing1 from './landing1.svg'
import { Button, Row, Col, Card, Icon } from 'antd';
import logo from '../../assets/logo.svg';

const LandingPage = (props) => {

  function renderLinks() {
    const links = {
      authenticated: [{to: '/signout', text: 'Sign Out', class: 'sign-out' }, {to: '/dashboard', text: 'Go To Dashboard', class: 'dashboard-link' }],
      notAuthenticated: [{to: '/jobs', text: 'Jobs', class: ''}, {to: '/about', text: 'About', class: ''}, {to: '/signin', text: 'Sign in', class: 'sign-in-link'}, {to: '/signup', text: 'Get Started', class: 'sign-up-link'}]
    };

    const linkType = (props.authenticated) ? 'authenticated' : 'notAuthenticated';

    return links[linkType].map((l) => (
      <Link to={l.to} key={l.to} className={`landing-page-link ${l.class}`} >{l.text}</Link>
    ));
  }

  return (
    <section className="landing-page-container">
      <main className="landing-page-main" >
        <section className="jumbotron">
          <header className="landing-page-header">
            <nav className="landing-page-nav">
              <div className="left-nav">
                <img src={logo} className="jumbotron-img" alt="logo" />
              </div>
              <div className="right-nav" >
                {renderLinks()}
              </div>
            </nav>
          </header>
          <div className="jumbotron-content">
            <div className="jumbotron-text">
              <h3>Tech Talent You'll Love</h3>
              <h3>In Companies That Will Love You</h3>
              <Row gutter={8} type="flex" justify="center">
                <Col>
                  <Link to="/signin" className="get-started-jumbotron get-started-jumbotron-sign-in">Sign in</Link>
                </Col>
                <Col>
                  <Link to="/signup" className="get-started-jumbotron">Get Started</Link>
                </Col>
              </Row>
            </div>
          </div>
        </section>
        <section className="opportunities-list-container landing-page-job-list" >
          <Row type="flex" justify="center" className="land-page-job-title">
            <Col>
              <h1 >Recent Jobs</h1>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col xs={24} sm={18} md={14}>
              {
                props.opportunities.map(o => (
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
                          <Button type="primary" >Show More <Icon type="right" /></Button>
                        </Link>
                      </Col>
                    </Row>
                  </Card>
                ))
              }
            </Col>
          </Row>
        </section>
      </main>
      {
        /*
        <footer className="landing-page-footer">
          Footer
        </footer>
        */
      }

    </section>
  )
}

export default LandingPage;
