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
  }, // TODO: todo
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
  }, // TODO: invalid url
  fieldInvalidUsername: {
    id: 'app.errors.fieldInvalidUsername',
  }, // TODO: invalid email
  fieldRange: {
    id: 'app.errors.fieldRange',
  },
  deadlinePassed: {
    id: 'app.errors.deadlinePassed',
  }, // TODO: tournament deadline passed
  tournamentNotActive: {
    id: 'app.errors.tournamentNotActive',
  }, // TODO: tournament deadline passed
  tournamentInBadState: {
    id: 'app.errors.tournamentInBadState',
  }, // TODO: tournament deadline passed
  tournamentInBadScope: {
    id: 'app.errors.tournamentInBadScope',
  }, // TODO: tournament deadline passed
  uneditablePropertyOfAPublishedTournament: {
    id: 'app.errors.uneditablePropertyOfAPublishedTournament',
  }, // TODO: tournament deadline passed
  userIsAlreadyManagerOfTournament: {
    id: 'app.errors.userIsAlreadyManagerOfTournament',
  }, // TODO: tournament deadline passed
  userIsNotManagerOfTournament: {
    id: 'app.errors.userIsNotManagerOfTournament',
  }, // TODO: tournament deadline passed
  // Password // TODO:
  fieldPasswordShort: {
    id: 'app.errors.fieldPasswordShort',
  }, // TODO: tournament deadline passed
  fieldPasswordUniqueChars: {
    id: 'app.errors.fieldPasswordUniqueChars',
  }, // TODO: tournament deadline passed
  fieldPasswordNonAlphanumeric: {
    id: 'app.errors.fieldPasswordNonAlphanumeric',
  }, // TODO: tournament deadline passed
  fieldPasswordDigit: {
    id: 'app.errors.fieldPasswordDigit',
  }, // TODO: tournament deadline passed
  fieldPasswordLower: {
    id: 'app.errors.fieldPasswordLower',
  }, // TODO: tournament deadline passed
  fieldPasswordUpper: {
    id: 'app.errors.fieldPasswordUpper',
  }, // TODO: tournament deadline passed
  fieldPasswordMismatch: {
    id: 'app.errors.fieldPasswordMismatch',
  }, // TODO: tournament deadline passed
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
    id: 'app.errors.invalidReference', // TODO:
  },
  invalidSchema: {
    id: 'app.errors.invalidSchema', // TODO:
  },
  invalidConfiguration: {
    id: 'app.errors.invalidConfiguration', // TODO:
  },
  invalidArchiveSize: {
    id: 'app.errors.invalidArchiveSize', // TODO:
  },
  // Custom
  tournamentFilesInvalidArchiveSize: {
    id: 'app.errors.tournamentFilesInvalidArchiveSize',
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
