import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

export const TextItem = props => <Input label={props.label} />;

TextItem.propTypes = {
  label: PropTypes.object,
};
