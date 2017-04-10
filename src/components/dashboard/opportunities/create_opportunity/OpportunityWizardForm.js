import React from 'react';
import { Progress, Popover, Col, Row, Card } from 'antd';
import { reduxForm } from 'redux-form';
import OpportunityFormPage1 from './OpportunityFormPage1';
import OpportunityFormPage2 from './OpportunityFormPage2';
import OpportunityFormPage3 from './OpportunityFormPage3';

const OpportunityWizardForm = ({ page, nextPage, prevPage, onSubmit, valid, anyTouch }) => {
  let cardTitle
  if(page === 1) {
    cardTitle = 'Company Details';
  } else if(page === 2) {
    cardTitle = 'Job Details';
  } else {
    cardTitle = 'Job Description';
  }

  return (
    <section className="opportunity-wizard-form-container">
      <Row gutter={16} type="flex" justify="center" >
        <Col xs={24} md={18} >
          <Card title={`Create A Job Listing - ${cardTitle}`}>
            <Progress percent={ ((page - 1)/ 3) * 100 } showInfo={false} status='active'/>
            <Row gutter={16} type="flex" justify="start" className="opportunity-wizard-form">
              <Col xs={24} md={(page === 3) ? 24 : 12} >
                {page === 1 && <OpportunityFormPage1 nextPage={nextPage} />}
                {page === 2 && <OpportunityFormPage2 nextPage={nextPage} prevPage={prevPage} />}
                {page === 3 && <OpportunityFormPage3 prevPage={prevPage} onSubmit={onSubmit} />}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

    </section>
  )
}

export default reduxForm({
  form: 'opportunity'
})(OpportunityWizardForm);
