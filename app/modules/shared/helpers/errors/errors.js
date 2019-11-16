import { defineMessages } from 'react-intl';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';

function toCamelCase(text) {
  return text.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

export const errorIntlMessages = defineMessages({
  missingError: {
    id: 'app.errors.missingError',
  },
  // Emails
  invalidEmailVerificationToken: {
    id: 'app.errors.invalidEmailVerificationToken',
  },
  // General errors
  genericError: {
    id: 'app.errors.genericError',
  },
  fieldMinLength: {
    id: 'app.errors.fieldMinLength',
  },
  fieldMaxLength: {
    id: 'app.errors.fieldMaxLength',
  },
  fieldMinValue: {
    id: 'app.errors.fieldMinValue',
  },
  fieldRequired: {
    id: 'app.errors.fieldRequired',
  },
  fieldInvalidEmail: {
    id: 'app.errors.fieldInvalidEmail',
  },
  fieldInvalidUrl: {
    id: 'app.errors.fieldInvalidUrl',
  },
  fieldInvalidUsername: {
    id: 'app.errors.fieldInvalidUsername',
  },
  fieldRange: {
    id: 'app.errors.fieldRange',
  },
  deadlinePassed: {
    id: 'app.errors.deadlinePassed',
  },
  tournamentNotActive: {
    id: 'app.errors.tournamentNotActive',
  },
  tournamentInBadState: {
    id: 'app.errors.tournamentInBadState',
  },
  tournamentInBadScope: {
    id: 'app.errors.tournamentInBadScope',
  },
  uneditablePropertyOfAPublishedTournament: {
    id: 'app.errors.uneditablePropertyOfAPublishedTournament',
  },
  userIsAlreadyManagerOfTournament: {
    id: 'app.errors.userIsAlreadyManagerOfTournament',
  },
  userIsNotManagerOfTournament: {
    id: 'app.errors.userIsNotManagerOfTournament',
  },
  // Password
  fieldPasswordShort: {
    id: 'app.errors.fieldPasswordShort',
  },
  fieldPasswordUniqueChars: {
    id: 'app.errors.fieldPasswordUniqueChars',
  },
  fieldPasswordNonAlphanumeric: {
    id: 'app.errors.fieldPasswordNonAlphanumeric',
  },
  fieldPasswordDigit: {
    id: 'app.errors.fieldPasswordDigit',
  },
  fieldPasswordLower: {
    id: 'app.errors.fieldPasswordLower',
  },
  fieldPasswordUpper: {
    id: 'app.errors.fieldPasswordUpper',
  },
  fieldPasswordMismatch: {
    id: 'app.errors.fieldPasswordMismatch',
  },
  // Conflicts
  gameNameConflict: {
    id: 'app.errors.gameNameConflict',
  },
  userEmailConflict: {
    id: 'app.errors.userEmailConflict',
  },
  userUsernameConflict: {
    id: 'app.errors.userUsernameConflict',
  },
  // Unauthorized user
  loginEmailNotConfirmed: {
    id: 'app.errors.loginEmailNotConfirmed',
  },
  loginLockout: {
    id: 'app.errors.loginLockout',
  },
  loginInvalid: {
    id: 'app.errors.loginInvalid',
  },
  invalidToken: {
    id: 'app.errors.invalidToken',
  },
  // Other
  invalidReference: {
    id: 'app.errors.invalidReference',
  },
  invalidSchema: {
    id: 'app.errors.invalidSchema',
  },
  invalidConfiguration: {
    id: 'app.errors.invalidConfiguration',
  },
  invalidArchiveSize: {
    id: 'app.errors.invalidArchiveSize',
  },
  // Custom
  tournamentFilesInvalidArchiveSize: {
    id: 'app.errors.tournamentFilesInvalidArchiveSize',
  },
  resetPasswordFailure: {
    id: 'app.errors.resetPasswordFailure',
  },
  tooManyRequests: {
    id: 'app.errors.tooManyRequests',
  },
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
        errors.withField[x.field] = {
          innerErrors: x.errors,
          messages: [],
        };
      }

      errorContainer = errors.withField[x.field].messages;
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

export function getGenericFormError() {
  return prepareFormErrors({
    code: 'generic-error',
    field: null,
  });
}
