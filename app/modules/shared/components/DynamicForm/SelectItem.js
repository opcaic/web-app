import React from 'react';
import { Select, Form as AntForm } from 'antd';
import PropTypes from 'prop-types';

export const SelectItem = props => (
  <AntForm.Item label={props.label} {...props.formItemLayout}>
    <Select onSelect={value => props.onChange(value)} value={props.value}>
      {props.options.enumOptions.map(opt => (
        <Select.Option key={opt.value} value={opt.value}>
          {opt.label}
        </Select.Option>
      ))}
    </Select>
  </AntForm.Item>
);

SelectItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  formItemLayout: PropTypes.object,
};
