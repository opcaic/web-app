import React from 'react';
import { Form as AntForm, Input } from 'antd';
import PropTypes from 'prop-types';

const getNumberRangeProps = schema => {
  const range = {};
  if (schema.type !== 'number') return range;

  if (schema.maximum || schema.maximum === 0) range.max = schema.maximum;
  if (schema.minimum || schema.minimum === 0) range.min = schema.minimum;

  return range;
};

export const TextItem = props => (
  <AntForm.Item label={props.label} {...props.options.formItemLayout}>
    <Input
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      {...getNumberRangeProps(props.schema)}
      {...props.schema}
    />
  </AntForm.Item>
);

TextItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  formItemLayout: PropTypes.object,
};
