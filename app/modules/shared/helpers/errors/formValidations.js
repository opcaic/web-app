import { intl } from '@/modules/shared/helpers/IntlGlobalProvider';
import { errorIntlMessages } from '@/modules/shared/helpers/errors/errors';

export function isRequired(field) {
  return {
    required: true,
    message: intl.formatMessage(errorIntlMessages.fieldRequired, { field }),
  };
}

export function isValidEmail() {
  return {
    type: 'email',
    message: intl.formatMessage(errorIntlMessages.fieldInvalidEmail),
  };
}

export function isMinLength(length, field = 'input') {
  return {
    min: length,
    message: intl.formatMessage(errorIntlMessages.fieldMinLength, {
      length,
      field,
    }),
  };
}
