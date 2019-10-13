import React from 'react';
import { Checkbox, Form as AntForm } from 'antd';
import PropTypes from 'prop-types';

export const CheckBoxItem = props => (
  <AntForm.Item label={props.label} {...props.formItemLayout}>
    <Checkbox
      onChange={e => props.onChange(e.target.checked)}
      checked={props.value}
    />
  </AntForm.Item>
);

CheckBoxItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  formItemLayout: PropTypes.object,
};
