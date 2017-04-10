import React from 'react';
import { Form, Input, Select } from 'antd';
const Option = Select.Option

const _jobTypeEnum = [
  'Full-time',
  'Part-time',
  'Temporary',
  'Contract',
  'Internship',
  'Commission',
  'Permanent',
  'Apprenticeship'
];

const _salaryPaidPerEnum = [
  'hour',
  'day',
  'month',
  'year'
];

export function renderField({input, label, placeholder, subTitle, type, meta: { touched, error} }) {
  let inputField;
  if(type === 'select' && input.name === 'salaryPaidPer') {
    inputField = (
      <Select
        placeholder={placeholder}
        {...input}
        showSearch
        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {_salaryPaidPerEnum.map(j => {
          return <Option key={j} value={j}>Per {j}</Option>
        })}
      </Select>
    );
  } else if(type === 'select') {

    inputField = (
      <Select
        placeholder={placeholder}
        {...input}
        showSearch
        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {_jobTypeEnum.map(j => (
          <Option key={j} value={j}>{j}</Option>
        ))}
      </Select>
    );

  } else if(type === 'textarea') {
    inputField = (
      <Input type="textarea" rows={8} {...input} placeholder={placeholder} />
    )
  } else {
    inputField = <Input {...input} placeholder={placeholder} type={type} />;
  }

  return (
    <Form.Item
      validateStatus={(touched && error) ? 'error': ''}
      help={touched && error}
    >
      <div>
        <p className="form-input-info form-input-tile">{label}</p>
        <p className="form-input-info form-input-subtitle">{subTitle}</p>
      </div>
      {inputField}
    </Form.Item>
  );

}

export function renderTags({fields, meta: { error} }) {
  return (
    <Form.Item>
      <div>
        <p className="form-input-info form-input-tile">Skills Involved</p>
        <p className="form-input-info form-input-subtitle">Outline all skills that are needed.</p>
      </div>
        <Select
          tags
          style={{ width: '100%' }}
          placeholder="Add skills here"
          notFoundContent="No skills added yet."
          onSelect={(value) => fields.insert(0, value)}
          onDeselect={(value) => fields.remove(fields.getAll().indexOf(value))}
          defaultValue={fields.getAll()}
        />
    </Form.Item>
  );
}
