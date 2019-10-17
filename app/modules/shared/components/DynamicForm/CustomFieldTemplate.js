import React from 'react';
import PropTypes from 'prop-types';

export const CustomFieldTemplate = props => {
  const { children } = props;

  return <div>{children}</div>;
};

CustomFieldTemplate.propTypes = {
  children: PropTypes.array,
};
