import React, { Component } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { Alert, Button, Card, Form, Input } from 'antd';
import * as actions from '../../actions';
import logo from '../../assets/logo.svg'

const renderField = ({input, label, type, meta: { touched, error} }) => (
  <Form.Item
    validateStatus={(touched && error) ? 'error': ''}
    help={touched && error}
    >
    <Input {...input} placeholder={label} type={type} />
  </Form.Item>
)

const validate = values => {
  const errors = {};

  if(!values.email) {
    errors.email = "Email is required";
  } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if(!values.password) errors.password = "Password is required";

  return errors;
}

class SignIn extends Component {
  handleFormSubmit = ({email, password}) => {
    this.props.signInUser({email, password});
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <Alert message={this.props.errorMessage} type="error" showIcon/>
      )
    }
  }

  componentWillUnmount() {
    // remove auth error
    this.props.removeAuthError()
  }

  render() {
    // const { getFieldDecorator } = this.props.form;
    const { handleSubmit } = this.props
    return (
      <section className="auth-container">
        <Link to="/" className="auth-logo" >
          <img src={logo} alt="Logo"/>
        </Link>
        <Card bordered className="auth-card">
          <header className="auth-card-header">

            <h2>Sign in to your account</h2>
          </header>
          { this.renderAlert() }
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <Field name="email" type="email" component={renderField} label="Email"></Field>
            <Field name="password" type="password" component={renderField} label="Password"></Field>
            <Form.Item>
              <Button icon="user" type="primary" htmlType="submit" className="login-form-button" size="large">
                Sign In
              </Button>
              <p>{ "Don't have an account?" } <Link to="signup">Sign up</Link></p>
            </Form.Item>
          </form>
        </Card>
      </section>
    );
  }
}

SignIn = reduxForm({
  form: 'signIn',
  validate
})(SignIn);

function mapStateToProps({ auth }) {
  return { errorMessage: auth.error };
}

SignIn = connect(mapStateToProps, { ...actions })(SignIn)

export default SignIn;
