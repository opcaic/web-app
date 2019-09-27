import React from 'react';
import PropTypes from 'prop-types';
import InnerMenu from '@/modules/public/components/layout/InnerMenu';
import { FormattedMessage } from 'react-intl';

const accountMenu = [
  {
    key: 'profile',
    text: <FormattedMessage id="app.public.accountMenu.profile" />,
    link: '/settings/profile',
  },
  {
    key: 'change-password',
    text: <FormattedMessage id="app.public.accountMenu.changePassword" />,
    link: '/settings/change-password',
  },
];

const AccountMenu = props => (
  <InnerMenu items={accountMenu} activeItems={props.activeItems} />
);

AccountMenu.propTypes = {
  activeItems: PropTypes.array,
};

export default AccountMenu;
