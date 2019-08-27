import { FormattedMessage } from 'react-intl';
import React from 'react';

export function roleIdToText(roleId) {
  switch (roleId) {
    case 1:
      return <FormattedMessage id="app.roles.user" defaultMessage="User" />;
    case 2:
      return (
        <FormattedMessage id="app.roles.organizer" defaultMessage="Organizer" />
      );
    case 3:
      return <FormattedMessage id="app.roles.admin" defaultMessage="Admin" />;
    default:
      return 'Undefined';
  }
}

export const ROLE_USER = 1;

export const ROLE_ORGANIZER = 2;

export const ROLE_ADMIN = 3;
