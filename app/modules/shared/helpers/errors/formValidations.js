import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { errorIntlMessages } from '@/modules/shared/helpers/errors/errors';

function getErrorMessage(key, errorMessageProvider, values) {
  if (errorMessageProvider && errorMessageProvider(key, values)) {
    return intlGlobal.formatMessage(errorMessageProvider(key, values), values);
  }

  return intlGlobal.formatMessage(errorIntlMessages[key], values);
}

export function isRequired(field, errorMessageProvider) {
  return {
    required: true,
    message: getErrorMessage('fieldRequired', errorMessageProvider, {
      field,
    }),
  };
}

export function isValidEmail(overriddenErrorMessages) {
  return {
    type: 'email',
    message: getErrorMessage('fieldInvalidEmail', overriddenErrorMessages),
  };
}

export function isMinLength(length, field = 'input', overriddenErrorMessages) {
  return {
    min: length,
    message: getErrorMessage('fieldMinLength', overriddenErrorMessages, {
      length,
      field,
    }),
  };
}
