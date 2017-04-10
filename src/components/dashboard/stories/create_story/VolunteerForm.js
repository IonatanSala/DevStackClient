import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Col, DatePicker, Form, Row, Select, Switch, Icon, Card, Button } from 'antd';
import { connect } from 'react-redux';
import renderField from './renderField';

const causes = [
  ["animalRights","Animal Rights"],
  ["artsAndCulture","Arts and Culture"],
  ["children","Children"],
  ["civilRights","Civil Rights"],
  ["humanitarianRelief","Humanitarian Relief"],
  ["economicEmpowerment","Economic Empowerment"],
  ["education","Education"],
  ["environment","Environment"],
  ["health","Health"],
  ["humanRights","Human Rights"],
  ["politics","Politics"],
  ["povertyAlleviation","Poverty Alleviation"],
  ["scienceAndTechnology","Science and Technology"],
  ["socialServices", "Social Services"]
];

const validate = (values) => {
  const errors = {};

  if(!values.organization) {
    errors.organization = "Organization is required.";
  }

  if(!values.role) {
    errors.role = 'Role is required.';
  }

  if(!values.from) {
    errors.from = "Start date is required.";
  }

  if(!values.to && !values.stillThere) {
    errors.to = "End date or if your still there must be checked";
    errors.stillThere = "End date or if your still there must be checked";
  }

  return errors;
};

class VolunteerForm extends Component {

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
            <Field name="organization" component={renderField} type="text" label="Organization" />
            <Field name="role" component={renderField} type="text" label="Role" placeholder="Your role in the organization" />
            <Row>
              <Col md={11} xs={24}>
                <Field name="cause" component={renderSearchSelect} type="text" label="Cause" />
              </Col>
            </Row>
            <Row gutter={16} >
              <Col md={12} xs={24}>
                <Field name="from" type="date" component={renderField} label="Start date"/>
              </Col>
              {
                (!this.props.stillThere)
                &&
                <Col md={12} xs={24}>
                  <Field name="to" type="date" component={this.renderToDatePicker} label="When did you finish?" />
                </Col>
              }
            </Row>
            <Field name="stillThere" component={renderSwitch} type="checkbox" label="Are you still there?"></Field>
            <Field name="description" component={renderField} type="textarea" label="Description"></Field>
            <div className="button-group">
              <Button type="primary" htmlType="submit" >{this.props.editPage ? 'Update' : 'Create'}</Button>
              {!this.props.editPage && <Button type="ghost" onClick={() => this.props.prevPage()}>Previous</Button>}
            </div>
          </form>
        </Col>
        <Col md={10} offset={2}>
          <Card loading title={this.props.organization} />
        </Col>
      </Row>
    );
  }
}

function renderSwitch({input, label, type, meta: { touched, error} }) {
  return (
    <Form.Item
      validateStatus={(touched && error) ? 'error': ''}
      help={touched && error}
      >
      <label>{label}</label>
      <br />
      <Switch {...input} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
    </Form.Item>
  );
}

function renderSearchSelect({input, label, type, meta: { touched, error} }) {
  const options = causes.map(cause => (
    <Select.Option key={cause[0]} value={cause[0]} >{capitalizeWords(cause[1])}</Select.Option>
  ));

  return (
    <Form.Item
      validateStatus={(touched && error) ? 'error': ''}
      help={touched && error}
      >
      <label>{label}</label>
        <Select
          placeholder="Select a person"
          {...input}
          showSearch
        >
          {options}
        </Select>
    </Form.Item>
  )

  function capitalizeWords(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
}



VolunteerForm = reduxForm({
  form: 'volunteer',
  initialValues: {
    type: 'volunteer'
  },
  validate,
  enableReinitialize: true
})(VolunteerForm);

const selector = formValueSelector('volunteer');
export default connect(
  state => {

    const stillThere = selector(state, 'stillThere');
    const from = selector(state, 'from');
    const to = selector(state, 'to');
    const organization = selector(state, 'organization');

    return {
      stillThere,
      from,
      to,
      organization
    };
  }
)(VolunteerForm);
