import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Alert, Card, Col, Row } from 'antd';
import SignUpSelect from './SignUpSelect';
import SignUp from './SignUp';
import { signUpUser, removeAuthError } from '../../actions';
import logo from '../../assets/logo.svg';

class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  nextPage = () => {
    this.setState({page: this.state.page + 1 });
  }

  prevPage = () => {
    this.setState({ page: this.state.page - 1});
  }

  renderAlert = () => {
    if(this.props.errorMessage) {
      return (
        <Row>
          <Col span={14} offset={6}>
            <Alert message={this.props.errorMessage} type="error" showIcon/>
          </Col>
        </Row>
      );
    }
  }

  componentWillUnmount() {
    this.props.removeAuthError()
  }

  render = () => {
    const { page } = this.state;
    const { handleSubmit } = this.props;

    return (
      <section className="auth-container">
        <Link to="/"  className="auth-logo" >
          <img src={logo} alt="Logo"/>
        </Link>
        <Card bordered className="auth-card auth-card-signup">
          <header className="auth-card-header">
            <h2>
              {page === 1 && 'Are you an User or Employer?'}
              {page === 2 && 'Create Your Account'}
            </h2>
          </header>
          {this.renderAlert()}
          {page === 1 && <SignUpSelect nextPage={this.nextPage} />}
          {page === 2 && <SignUp prevPage={this.prevPage} onSubmit={handleSubmit} />}
        </Card>
      </section>
    );
  }
}

function mapStateToProps({auth}) {
  return {
    errorMessage: auth.error
  };
}

export default connect(mapStateToProps, { handleSubmit: signUpUser, removeAuthError })(SignUpContainer);
