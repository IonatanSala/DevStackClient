import React from 'react';
import { Button, Icon, Card } from 'antd';
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import developerSVG from './developer.svg';
import employerSVG from './employer.svg';

const renderField = ({input, id, type}) => {
  return <input {...input} id={id} type={type} style={{display: "none"}} />;
}


let SignUpSelect = (props) => {
  return (
    <form >
      <div className="select-signup-type">
        <Card className={`signup-card ${props.isEmployer === "false" && 'active-signup-card'}`} >
          <header className="story-card-icon">
            <img src={developerSVG} alt="user icon" />
          </header>
          <section>
            <h1>User</h1>
            <p>Sign up to our platform as a user.</p>
            <label htmlFor="isNotEmployer" className={props.isEmployer === "false" && 'active-signup-select'}>
              {(props.isEmployer === "false") ? `Selected`: 'Select'}
              {(props.isEmployer === "false") && <Icon type="check" />}
            </label>
          </section>
        </Card>
        <Card className={`signup-card ${props.isEmployer === "true" && 'active-signup-card'}`} >
          <header className="story-card-icon">
            <img src={employerSVG} alt="employer icon"/>
          </header>
          <section>
            <h1>Employer</h1>
            <p>Sign up to our platform as an employer.</p>
            <label htmlFor="isEmployer" className={props.isEmployer === "true" && 'active-signup-select'}>
              {(props.isEmployer === "true") ? `Selected`: 'Select'}
              {(props.isEmployer === "true") && <Icon type="check" />}
            </label>
          </section>
        </Card>

      </div>
      <Field name="isEmployer" id="isNotEmployer" type="radio" value="false" component={renderField}></Field>
      <Field name="isEmployer" id="isEmployer" type="radio" value="true" component={renderField}></Field>
      <div className="button-group">
        <Button type="primary" size="large" onClick={props.nextPage}>Next<Icon type="right" /></Button>
      </div>
      <p className="have-acc">{"Already have an account?"} <Link to="signin">Sign in</Link></p>
    </form>

  );
}

SignUpSelect = reduxForm({
  form: 'signUp',
  initialValues: {
    isEmployer: "false"
  },
  destroyOnUnmount: false
})(SignUpSelect);

const selector = formValueSelector('signUp');
function mapStateToProps(state) {
  const isEmployer = selector(state, 'isEmployer');

  return {
    isEmployer
  };
}
export default connect(mapStateToProps)(SignUpSelect);
