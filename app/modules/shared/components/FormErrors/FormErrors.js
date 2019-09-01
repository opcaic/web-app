import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

const FormErrors = ({ errors }) =>
  errors && (
    <div style={{ marginBottom: 10 }}>
      {errors.map((x, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <Alert message={x} key={key} type="error" />
      ))}
    </div>
  );

FormErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default FormErrors;
