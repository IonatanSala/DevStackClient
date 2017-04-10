import React, { Component } from 'react';
import { Button, Col, DatePicker, Form, Row, Card } from 'antd';
import { FieldArray, Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import renderField, { renderTags } from './renderField';

const validate = (values) => {
  const errors = {};
  if(!values.title) {
    errors.title = 'Title is required';
  }

  if(!values.companyName) {
    errors.companyName = 'Company name is required';
  }

  return errors;
}

class ExperienceForm extends Component {
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
          <form onSubmit={handleSubmit} >
            <Field name="title" type="text" component={renderField} label="Job Title" />
            <Field name="companyName" type="text" component={renderField} label="Company Worked For" />
            <Row gutter={16} type="flex" justify="space-between">
              <Col md={12} xs={24}>
                <Field name="from" type="date" component={renderField} label="Start date"/>
              </Col>
              <Col md={12} xs={24}>
                <Field name="to" type="date" component={this.renderToDatePicker} label="End date" />
              </Col>
            </Row>
            <Field name="description" type="textarea" row={4} component={renderField} label="Description" />
            <FieldArray name="skillsInvolved" component={renderTags} />
            <div className="button-group">
              <Button type="primary" htmlType="submit" >{this.props.editPage ? 'Update' : 'Create'}</Button>
              {!this.props.editPage && <Button type="ghost" onClick={() => this.props.prevPage()}>Previous</Button>}
            </div>
          </form>
        </Col>
        <Col xs={24} md={10} >
          <Card loading title={this.props.title} />
        </Col>
      </Row>

    );
  }
}

ExperienceForm = reduxForm({
  form: 'experience',
  initialValues: {
    type: 'experience',
  },
  validate,
  enableReinitialize: true
})(ExperienceForm);

const selector = formValueSelector('experience');
export default connect(
  state => {
    const from = selector(state, 'from');
    const to = selector(state, 'to');
    const title = selector(state, 'title');

    return {
      from,
      to,
      title
    };
  }
)(ExperienceForm);
