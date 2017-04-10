import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { Row, Col, Button, Icon } from 'antd';
import { renderField } from './renderField';
import { validate3 } from './validate';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../assets/react-editor.sass'
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

class OpportunityFormPage3 extends Component {
  state: any = {
    editorContents: [],
  };

  onEditorStateChange: Function = (index, editorContent) => {
    let editorContents = this.state.editorContents;
    editorContents[index] = editorContent;
    editorContents = [...editorContents];
    this.setState({
      editorContents,
    });
  };

  renderEditor = ({ label, subTitle, input: { value, onChange }, meta}) => {
    console.log(meta)
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


  render() {
    const { handleSubmit, prevPage, valid, contentState, onContentStateChange, editPage } = this.props;

    return (
      <form onSubmit={handleSubmit} >
        <Field
          name="description"
          label="Job description"
          placeholder="Job Type"
          subTitle="Outline the responsibilities of the job, desired work experience, education and skills."
          component={this.renderEditor}
        />
        {
          !editPage
          &&
          <div className="button-group">
            <Button type="primary" disabled={!valid} htmlType="submit" >Create </Button>
            <Button type="default" className="prev-button" onClick={prevPage} ><Icon type="left" />Previous</Button>
          </div>
        }
      </form>
    );
  }
}

export default reduxForm({
  form: 'opportunity',
  destroyOnUnmount: false,
  onSubmitSuccess: function(results, dispatch, props) {
    dispatch(reset('opportunity'));
  },
  validate: validate3
})(OpportunityFormPage3);
