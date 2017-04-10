import React from 'react';
import { DatePicker, Form, Input, Select } from 'antd';

export default function renderField({input, label, type, meta: { touched, error} }) {
  let inputField;

  if(type === 'date') {
    inputField = (
      <DatePicker
        {...input}
      />
    );
  } else if(type === 'textarea'){
    inputField = <Input {...input} placeholder={label} type={type} rows={5} />;
  } else {
    inputField = <Input {...input} placeholder={label} type={type} />;
  }

  return (
    <Form.Item
      validateStatus={(touched && error) ? 'error': ''}
      help={touched && error}
      >
      <label>{label}</label>
      {inputField}
    </Form.Item>
  );
}

export function renderTags({fields, meta: { error}, ...props}) {
  return (
    <Form.Item>
      <label>Skills Involved</label>
        <Select
          tags
          style={{ width: '100%' }}
          placeholder="Add skills used during this job."
          notFoundContent="No skills added yet."
          onSelect={(value) => fields.insert(0, value)}
          onDeselect={(value) => fields.remove(fields.getAll().indexOf(value))}
          defaultValue={fields.getAll()}
        />
    </Form.Item>
  );
}
