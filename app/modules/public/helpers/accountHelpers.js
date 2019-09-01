import { defineMessages } from 'react-intl';

const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const accountIntlMessages = defineMessages({
  username: { id: 'app.public.accountHelpers.username' },
  email: { id: 'app.public.accountHelpers.email' },
  password: { id: 'app.public.accountHelpers.password' },
  confirmPassword: { id: 'app.public.accountHelpers.confirmPassword' },
});

export const accountErrorIntlMessages = defineMessages({
  fieldRequiredUsername: { id: 'app.public.accountErrors.usernameRequired' },
  fieldRequiredEmail: { id: 'app.public.accountErrors.emailRequired' },
  fieldRequiredPassword: { id: 'app.public.accountErrors.passwordRequired' },
  fieldRequiredConfirmPassword: {
    id: 'app.public.accountErrors.confirmPasswordRequired',
  },
});

export function accountErrorMessageProvider(code, values) {
  const key = `${code}${capitalize(values.field)}`;

  return accountErrorIntlMessages[key];
}
