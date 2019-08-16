import { defineMessages } from 'react-intl';
import { intl } from '@/modules/shared/helpers/IntlGlobalProvider';

function toCamelCase(text) {
  return text.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

export const errorIntlMessages = defineMessages({
  missingError: { id: 'app.errors.missingError' },
  // General errors
  fieldMinLength: { id: 'app.errors.fieldMinLength' },
  fieldMaxLength: { id: 'app.errors.fieldMaxLength' },
  fieldMinValue: { id: 'app.errors.fieldMinValue' },
  fieldRequired: { id: 'app.errors.fieldRequired' },
  fieldInvalidEmail: { id: 'app.errors.fieldInvalidEmail' },
  fieldRange: { id: 'app.errors.fieldRange' },
  // Conflicts
  gameNameConflict: { id: 'app.errors.gameNameConflict' },
  userEmailConflict: { id: 'app.errors.userEmailConflict' },
  userUsernameConflict: { id: 'app.errors.userUsernameConflict' },
  oldPasswordConflict: { id: 'app.errors.oldPasswordConflict' },
  passwordKeyConflict: { id: 'app.errors.passwordKeyConflict' },
  userWithEmailNotFound: { id: 'app.errors.userWithEmailNotFound' },
});

export function prepareFormErrorsFromResponse(apiResponse) {
  const errors = {};

  if (Array.isArray(apiResponse.data.errors)) {
    apiResponse.data.errors.forEach(x => {
      if (!errors[x.field]) {
        errors[x.field] = [];
      }

      let error = null;

      const camelCasedCode = toCamelCase(x.code);

      if (errorIntlMessages[camelCasedCode]) {
        error = intl.formatMessage(errorIntlMessages[camelCasedCode], x);
      } else {
        error = x.message;

        if (error === null) {
          error = intl.formatMessage(errorIntlMessages.missingError, {
            code: x.code,
          });
        }

        console.error(`Error message not found, see the error below:`);
        console.error(x);
      }

      errors[x.field].push(error);
    });
  }

  return errors;
}
