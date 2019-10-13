import { defineMessages } from 'react-intl';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';

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
  // Unauthorized user
  loginEmailNotConfirmed: { id: 'app.errors.loginEmailNotConfirmed' },
  loginLockout: { id: 'app.errors.loginLockout' },
  loginInvalid: { id: 'app.errors.loginInvalid' },
  invalidToken: { id: 'app.errors.invalidToken' },
  //
  resetPasswordFailure: { id: 'app.errors.resetPasswordFailure' },
  invalidArchiveSize: { id: 'app.errors.invalidArchiveSize' },
});

export function prepareFormErrors(
  data,
  errorMessageProvider,
  ignoreFields = false,
) {
  const errors = { withField: {}, withoutField: [] };
  let apiErrors;

  if (Array.isArray(data.errors)) {
    apiErrors = data.errors;
  } else if (data.code) {
    apiErrors = [{ ...data, field: null }];
  } else {
    return {};
  }

  apiErrors.forEach(x => {
    let error = null;
    let errorContainer = null;

    if (x.field !== null && ignoreFields === false) {
      if (!errors.withField[x.field]) {
        errors.withField[x.field] = [];
      }

      errorContainer = errors.withField[x.field];
    } else {
      errorContainer = errors.withoutField;
    }

    const camelCasedCode = toCamelCase(x.code);

    if (errorMessageProvider && errorMessageProvider(camelCasedCode, x)) {
      error = intlGlobal.formatMessage(
        errorMessageProvider(camelCasedCode, x),
        x,
      );
    } else if (errorIntlMessages[camelCasedCode]) {
      error = intlGlobal.formatMessage(errorIntlMessages[camelCasedCode], x);
    } else {
      error = x.message;

      if (error === null) {
        error = intlGlobal.formatMessage(errorIntlMessages.missingError, {
          code: x.code,
        });
      }

      console.error(`Error message not found, see the error below:`);
      console.error(x);
    }

    errorContainer.push(error);
  });

  return errors;
}
