import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Row, Col, Card, Button, Upload, message, Icon } from 'antd';
import { renderField } from './renderField';



class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: ''
    };
  }

  uploadProps = () => {
    return {
      name: 'file',
      action: 'http://localhost:8000/users/avatar',
      headers: {
        authorization: localStorage.getItem('token')
      },
      onChange: (info) => {
        if(info.file.status === 'done') {
          this.setState({
            imageUrl: info.file.response
          });
          message.success('Upload complete!');
        }
      }
    }
  }

  renderImage = () => {
    let imageUrl;

    if(this.state.imageUrl) {
      imageUrl = this.state.imageUrl
    } else if(this.props.profile && this.props.profile.avatar) {
      imageUrl = this.props.profile.avatar;
    } else {
      return (
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      );
    }

    return <img src={imageUrl} style={{width: "75px", height: "75px", "borderRadius": "50%", border: "2px solid #E9E9E9" }}alt="avatar" />;
  }

  render = () => {
    const { valid, handleSubmit} = this.props;

    return (
      <section>
        <Row type="flex" justify="center">
          <Col xs={24} md={12}>
            <Card title="Edit Your Profile">
              <Upload {...this.uploadProps()}>
                {this.renderImage()}
              </Upload>
              <form onSubmit={handleSubmit}>
                <Row gutter={16} type="flex" justify="space-between">
                  <Col xs={24} md={12} >
                    <Field name="firstName" label="First Name" placeholder="First Name" component={renderField} />
                  </Col>
                  <Col xs={24} md={12}>
                    <Field name="lastName" label="Last Name" placeholder="Last Name" component={renderField} />
                  </Col>
                </Row>

                <Row gutter={16} type="flex" justify="space-between">
                  <Col xs={24} md={12} >
                    <Field name="headline" label="Headline" placeholder="Headline" component={renderField} />
                  </Col>
                </Row>

                <Row gutter={16} type="flex" justify="space-between">
                  <Col xs={24} md={24} >
                    <Field type="textarea" name="summary" label="Headline" placeholder="Headline" component={renderField} />
                  </Col>
                </Row>

                <div className="button-group">
                  <Button type="primary" htmlType="submit">Update</Button>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
      </section>
    );
  }
}

export default reduxForm({
  form: 'editProfile',
  enableReinitialize: true
})(EditProfile);
