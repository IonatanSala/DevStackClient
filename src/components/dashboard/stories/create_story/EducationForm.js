import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Col, Row, Form, DatePicker, Card, Button } from 'antd';
import { connect } from 'react-redux';
import renderField from './renderField';

// Validation for EducationFrom
const validate = values => {
  const errors = {};

  if(!values.name) {
    errors.name = 'Education Institution name needed.';
  }

  if(!values.degree) {
    errors.degree = 'Type of degree required.';
  }

  if(!values.fieldOfStudy) {
    errors.fieldOfStudy = 'This field is required.';
  }

  if(!values.from) {
    errors.from = 'Start date is required.';
  }

  if(!values.to) {
    errors.to = 'End date or expected end date is required.';
  }

  return errors;
}


class EducationForm extends Component {

  disabledEndDate = (endValue) => {
    const startValue = this.props.from

    if (!endValue || !startValue) {
      return false;
    }

    return endValue.valueOf() <= startValue.valueOf();
  }

  renderToDatePicker = ({input, label, type, meta: { touched, error} }) => {
    return (
      <Form.Item
        validateStatus={(touched && error) ? 'error': ''}
        help={touched && error}
        >
        <label>{label}</label>
        <DatePicker
          disabledDate={this.disabledEndDate}
          {...input}
        />
      </Form.Item>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Row gutter={16} type="flex" justify="space-between">
        <Col md={10} xs={24}>
          <form onSubmit={handleSubmit}>
            <Field name="name" type="text" component={renderField} label="College/University Name" />
            <Field name="degree" type="text" component={renderField} label="Degree Type" />
            <Field name="fieldOfStudy" type="text" component={renderField} label="Field of study" />
            <Row gutter={16} type="flex" justify="space-between">
              <Col md={12} xs={24}>
                <Field name="from" type="date" component={renderField} label="Start date"/>
              </Col>
              <Col md={12} xs={24}>
                <Field name="to" type="date" component={this.renderToDatePicker} label="End date" />
              </Col>
            </Row>
            <div className="button-group">
              <Button type="primary" htmlType="submit" >{this.props.editPage ? 'Update' : 'Create'}</Button>
              {!this.props.editPage && <Button type="ghost" onClick={() => this.props.prevPage()}>Previous</Button>}
            </div>
          </form>
        </Col>
        <Col xs={24} md={10}>
          <Card loading title={this.props.name} />
        </Col>
      </Row>

    );
  }
}

EducationForm = reduxForm({
  form: 'education',
  initialValues: {
    type: 'education'
  },
  validate,
  enableReinitialize: true
})(EducationForm);

const selector = formValueSelector('education');
export default connect(
  state => {
    const from = selector(state, 'from');
    const to = selector(state, 'to');
    const name = selector(state, 'name');

    return {
      from,
      to,
      name
    };
  }
)(EducationForm);
