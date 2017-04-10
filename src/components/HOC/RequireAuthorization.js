import React, { Component } from 'react';
import { browserHistory } from 'react-router';

function AuthorizationHOC({ isEmployer }) {
  return function(ComposedComponent) {
    return class Authorization extends Component {
      constructor(props) {
        super(props);
        this.state = {
          authenticated: localStorage.getItem('token'),
          isEmployer: localStorage.getItem('isEmployer')
        };
      }

      componentWillMount = () => {
        if (!this.authenticated && this.state.isEmployer !== JSON.stringify(isEmployer)) {
          browserHistory.push('/404notfound');
        }
      }

      componentWillUpdate = (nextProps) => {
        if (!localStorage.getItem('token') && localStorage.getItem('isEmployer') !== JSON.stringify(isEmployer)) {
          browserHistory.push('/404notfound');
        }
      }

      render() {
        return <ComposedComponent {...this.props} />
      }

    }

  }
}

export default AuthorizationHOC;
