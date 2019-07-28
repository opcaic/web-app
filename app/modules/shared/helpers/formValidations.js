import React from 'react';
import { FormattedMessage } from 'react-intl';

export function isRequired(field) {
  return {
    required: true,
    message: (
      <FormattedMessage
        id="app.formValidations.isRequired"
        values={{ field }}
      />
    ),
  };
}

export function isValidEmail() {
  return {
    type: 'email',
    message: <FormattedMessage id="app.formValidations.isValidEmail" />,
  };
}

export function isMinLength(minLength, field = 'input') {
  return {
    min: minLength,
    message: `The ${field} must be at least ${minLength} characters long`,
  };
}
