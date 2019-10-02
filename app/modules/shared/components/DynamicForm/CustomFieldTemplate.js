import React from 'react';
import { Form as AntForm } from 'antd';
import PropTypes from 'prop-types';

export const CustomFieldTemplate = props => {
  const { label, required, children } = props;

  return (
    <AntForm.Item label={label} required={required}>
      {children}
    </AntForm.Item>
  );
};

CustomFieldTemplate.propTypes = {
  label: PropTypes.object,
  required: PropTypes.bool,
  children: PropTypes.object,
};
