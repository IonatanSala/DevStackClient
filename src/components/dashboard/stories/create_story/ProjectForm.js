import React, { Component } from 'react';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import renderField, { renderTags } from './renderField';
import { Col, Row, Card, Form, DatePicker, Button } from 'antd';

const validate = (values) => {
  const errors = {};

  if(!values.title) {
    errors.title = "Title is required.";
  }

  const isValidUrl = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
  if(values.url && !isValidUrl.test(values.url)) {
    errors.url = "Invalid url"
  }
  return errors;
};

class ProjectForm extends Component {
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
        <Col md={12} xs={24}>
          <form onSubmit={handleSubmit} >
            <Field name="title" type="text" component={renderField} label="Project Title" />
            <Field name="url" type="text" component={renderField} label="Project URL" />
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
        <Col md={10} xs={24} >
          <Card loading title={this.props.title} />
        </Col>
      </Row>
    );
  }
}

ProjectForm = reduxForm({
  form: 'project',
  initialValues: {
    type: 'project'
  },
  validate,
  enableReinitialize: true
})(ProjectForm);

const selector = formValueSelector('project');
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
)(ProjectForm);
