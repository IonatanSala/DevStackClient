import React, { Component } from 'react';
import { reduxForm, reset, Field, FieldArray } from 'redux-form';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import OpportunityWizardForm from '../create_opportunity/OpportunityWizardForm';
import OpportunityFormPage1 from '../create_opportunity/OpportunityFormPage1';
import OpportunityFormPage2 from '../create_opportunity/OpportunityFormPage2';
import OpportunityFormPage3 from '../create_opportunity/OpportunityFormPage3';
import { Button, Col, Row, Card, Modal } from 'antd';
import { renderField, renderTags } from '../create_opportunity/renderField';
import validate from './validate';
const confirm = Modal.confirm;

class EditOpportunity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContents: [EditorState.createEmpty()]
    }
  }

  onEditorStateChange = (index, editorContent) => {
    let editorContents = this.state.editorContents;
    editorContents[index] = editorContent;
    editorContents = [...editorContents];
    this.setState({
      editorContents
    });
  };

  componentWillReceiveProps = (nextProps) => {
    if (this.props !== nextProps && nextProps.initialValues.description) {
      if(!this.state.gotDescription) {
        this.setState({
          editorContents: [this.HTMLtoDraft(nextProps.initialValues.description)],
          gotDescription: true
        });
      }
    }
  }


  HTMLtoDraft = (contents) => {
      if(contents.charAt('0') !== '<') contents = `<p>${contents}</p>`;
      const blocksFromHTML = htmlToDraft(contents);
      const contentBlocks = blocksFromHTML.contentBlocks;
      const contentState = ContentState.createFromBlockArray(contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      return editorState;
  }

  renderEditor = ({ label, subTitle, input: { value, onChange }, meta}) => {
    return (
      <div>
        <div>
          <p className="form-input-info form-input-tile">{label}</p>
          <p className="form-input-info form-input-subtitle">{subTitle}</p>
        </div>
        <Editor
          hashtag={{}}
          editorState={this.state.editorContents[0]}
          onEditorStateChange={(contents) => {
            this.onEditorStateChange(0, contents)
            onChange(draftToHtml(convertToRaw(this.state.editorContents[0].getCurrentContent())).split('\n').join('<br />'))
          }}
          toolbar={{
            options: ['blockType', 'list', 'textAlign'],
            list: {
              inDropdown: true
            },
            textAlign: {
              inDropdown: true
            }
          }}
        />
      <small className="form-input-info form-input-subtitle">* Job description must be a minimum of 30 characters.</small>
      </div>
    )
  }

  showDeletePopup = () => {
    confirm({
      title: 'Delete this job listing?',
      content: 'Are you sure you want to delete this listing? It will be permanently removed.',
      okText: 'Delete',
      onOk: () => {
        this.props.handleRemove();
      },
      onCancel() {},
    });
  }


  render = () => {
    const { page, nextPage, prevPage, handleSubmit, valid } = this.props;

    return (
      <section className="opportunity-wizard-form-container">
        <Row gutter={16} type="flex" justify="center" >
          <Col xs={24} md={18} >
            <Card title="Edit Job Listing" extra={<Button type="danger" onClick={this.showDeletePopup} >Delete</Button>}>
              <form onSubmit={handleSubmit} >
                <Row gutter={16} type="flex" justify="start" className="opportunity-wizard-form">
                  <Col xs={24} md={12} >
                    <Field
                      name="company"
                      type="text"
                      label="What is the name of your company?"
                      placeholder="Company name"
                      subTitle="This will be included in your job posting"
                      component={renderField}
                    />
                    <Field
                      name="title"
                      type="text"
                      label="What is the job title for this posting?"
                      placeholder="Job title"
                      subTitle="Provide a brief but specific title"
                      component={renderField}
                    />

                    <Field
                      name="location"
                      type="text"
                      label="Job Location"
                      placeholder="e.g Dublin"
                      subTitle="Where is the job located"
                      component={renderField}
                    />

                    <Field
                      name="jobType"
                      type="select"
                      label="What type of job is it?"
                      placeholder="Job Type"
                      subTitle="Choose from the following list."
                      component={renderField}
                    />

                    <FieldArray name="skills" component={renderTags} />

                    <Row gutter={16} type="flex" justify="space-between" align="bottom">
                      <Col xs={24} md={12} >
                        <Field
                          name="salary"
                          type="number"
                          label="Salary"
                          placeholder="&euro;"
                          subTitle="Salary in euro"
                          component={renderField}
                        />
                      </Col>
                      <Col xs={24} md={12} >
                        <Field
                          name="salaryPaidPer"
                          type="select"
                          label="How often is the salary"
                          subTitle="Select from the list below"
                          placeholder="Salary Paid Per"
                          component={renderField}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} md={24} >
                    {
                      this.props.initialValues.description
                      &&
                      <Field
                        name="description"
                        label="Job description"
                        placeholder="Job Type"
                        subTitle="Outline the responsibilities of the job, desired work experience, education and skills."
                        component={this.renderEditor}
                      />
                    }

                  </Col>
                  <Col xs={24} md={24} >
                    <Button type="primary" disabled={!valid} htmlType="submit" >Update</Button>
                  </Col>
                </Row>
              </form>
            </Card>
          </Col>
        </Row>
      </section>
    );
  }
}

export default reduxForm({
  form: 'opportunityEdit',
  validate,
  enableReinitialize: true
})(EditOpportunity);
