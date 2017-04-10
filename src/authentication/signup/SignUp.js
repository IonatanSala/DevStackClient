import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { Link } from 'react-router';
import { Button, Col, Input, Form, Row, Icon } from 'antd';
import validate from './validate';

const renderField = ({input, label, type, meta: { touched, error} }) => (
  <Form.Item
    validateStatus={(touched && error) ? 'error': ''}
    help={touched && error}
    >
    <Input {...input} placeholder={label} type={type} />
  </Form.Item>
)


class SignUp extends Component {
  render() {
    const { handleSubmit, prevPage } = this.props

    return (
      <form onSubmit={handleSubmit} >
        <Row type="flex" justify="center">
          <Col xs={24} md={15}>
            <Field name="email" type="email" component={renderField} label="Email"></Field>
            <Field name="password" type="password" component={renderField} label="Password"></Field>
            <Field name="password_confirm" type="password" component={renderField} label="Confrim Password"></Field>
            <Form.Item >
              <Button icon="user" type="primary" htmlType="submit" size="large">Sign up</Button>
              <Button type="default" size="large" onClick={prevPage} ><Icon type="left" />Previous</Button>
            </Form.Item>
            <p className="have-acc">{"Already have an account?"} <Link to="signin">Sign in</Link></p>
          </Col>
        </Row>
      </form>
    );
  }
}

SignUp = reduxForm({
  form: 'signUp',
  onSubmitSuccess: function(results, dispatch, props) {
    dispatch(reset('signUp'));
  },
  validate,
  destroyOnUnmount: false
})(SignUp)

export default SignUp;
