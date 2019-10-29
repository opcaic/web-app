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

export function isValidEmail(errorMessageProvider) {
  return {
    type: 'email',
    message: getErrorMessage('fieldInvalidEmail', errorMessageProvider),
  };
}

export function isMinLength(length, field = 'input', errorMessageProvider) {
  return {
    min: length,
    message: getErrorMessage('fieldMinLength', errorMessageProvider, {
      length,
      field,
    }),
  };
}

export function isMaxLength(length, field = 'input', errorMessageProvider) {
  return {
    max: length,
    message: getErrorMessage('fieldMaxLength', errorMessageProvider, {
      length,
      field,
    }),
  };
}

export function isPasswordMinLength(length, errorMessageProvider) {
  return {
    min: length,
    message: getErrorMessage('fieldPasswordShort', errorMessageProvider, {
      minimum: length,
    }),
  };
}

export const normalizeEmptyString = val => (val !== '' ? val : undefined);
