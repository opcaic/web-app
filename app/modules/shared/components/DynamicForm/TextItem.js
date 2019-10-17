import React from 'react';
import { Form as AntForm, Input } from 'antd';
import PropTypes from 'prop-types';

export const TextItem = props => (
  <AntForm.Item label={props.label} {...props.options.formItemLayout}>
    <Input value={props.value} onChange={e => props.onChange(e.target.value)} />
  </AntForm.Item>
);

TextItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  formItemLayout: PropTypes.object,
};
