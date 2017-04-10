import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { Row, Col, Button, Icon } from 'antd';
import { renderField, renderTags } from './renderField';
import { validate2 } from './validate';

const OpportunityFormPage2 = ({ handleSubmit, prevPage, nextPage, pristine, valid, editPage }) => (
  <form onSubmit={handleSubmit} >
    <Field
      name="title"
      type="text"
      label="What is the job title for this posting?"
      placeholder="Job title"
      subTitle="Provide a brief but specific title"
      component={renderField}
    />

    <Field
      name="location"
      type="text"
      label="Job Location"
      placeholder="e.g Dublin"
      subTitle="Where is the job located"
      component={renderField}
    />

  <Field
    name="jobType"
    type="select"
    label="What type of job is it?"
    placeholder="Job Type"
    subTitle="Choose from the following list."
    component={renderField}
  />

  <FieldArray name="skills" component={renderTags} />

  <Row gutter={16} type="flex" justify="space-between" align="bottom">
    <Col xs={24} md={12} >
      <Field
        name="salary"
        type="number"
        label="Salary"
        placeholder="&euro;"
        subTitle="Salary in euro"
        component={renderField}
      />
    </Col>
    <Col xs={24} md={12} >
      <Field
        name="salaryPaidPer"
        type="select"
        label="How often is the salary"
        subTitle="Select from the list below"
        placeholder="Salary Paid Per"
        component={renderField}
      />
    </Col>
  </Row>


  {
    !editPage
    &&
    <div className="button-group">
      <Button disabled={!valid} type="primary" onClick={nextPage} >Next<Icon type="right" /></Button>
      <Button type="default" className="prev-button" onClick={prevPage} ><Icon type="left" />Previous</Button>
    </div>
  }

  </form>
)

export default reduxForm({
  form: 'opportunity',
  destroyOnUnmount: false,
  validate: validate2
})(OpportunityFormPage2);
