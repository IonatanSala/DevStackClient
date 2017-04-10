import React from 'react';
import { Form, Input } from 'antd';

export function renderField({input, label, placeholder, subTitle, type, meta: { touched, error} }) {
  let inputField;

  if(type === 'textarea') {
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
