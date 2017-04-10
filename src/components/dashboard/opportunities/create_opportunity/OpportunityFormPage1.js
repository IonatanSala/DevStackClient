import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button, Icon } from 'antd';
import { renderField } from './renderField';
import { validate1 } from './validate';

const OpportunityFormPage1 = ({ handleSubmit, nextPage, valid, editPage }) => (
  <form onSubmit={handleSubmit} >
    <Field
      name="company"
      type="text"
      label="What is the name of your company?"
      placeholder="Company name"
      subTitle="This will be included in your job posting"
      component={renderField}
    />
    {
      !editPage
      &&
      <div className="button-group">
        <Button disabled={!valid} type="primary" onClick={nextPage} >Next<Icon type="right" /></Button>
      </div>
    }
  </form>
)

export default reduxForm({
  form: 'opportunity',
  validate: validate1,
  destroyOnUnmount: false
})(OpportunityFormPage1);
