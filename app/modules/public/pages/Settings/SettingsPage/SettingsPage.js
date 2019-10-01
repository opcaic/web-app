import React from 'react';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import { Route, Switch } from 'react-router-dom';
import InnerMenuPageContent from '@/modules/public/components/layout/InnerMenuPageContent';
import { FormattedMessage } from 'react-intl';
import withMenuSync from '@/modules/shared/helpers/hocs/withMenuSync';
import withSyncedActiveItems from '@/modules/shared/helpers/hocs/withSyncedActiveItems';
import AccountMenu from '@/modules/public/components/Account/AccountMenu';
import ProfilePage from '@/modules/public/pages/Settings/ProfilePage';
import ChangePasswordPage from '@/modules/public/pages/Settings/ChangePasswordPage';

const SyncedAccountMenu = withSyncedActiveItems(AccountMenu, 'accountMenu');

const MenuSyncedProfilePage = withMenuSync(ProfilePage, {
  accountMenu: ['profile'],
});

const MenuSyncedChangePasswordPage = withMenuSync(ChangePasswordPage, {
  accountMenu: ['change-password'],
});

/* eslint-disable react/prefer-stateless-function */
export class SettingsPage extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <InnerMenuPageContent
          title={<FormattedMessage id="app.public.settingsPage.title" />}
          menu={<SyncedAccountMenu />}
        >
          <Switch>
            <Route
              exact
              path="/settings/profile"
              component={MenuSyncedProfilePage}
            />
            <Route
              exact
              path="/settings/change-password"
              component={MenuSyncedChangePasswordPage}
            />
          </Switch>
        </InnerMenuPageContent>
      </PageLayout>
    );
  }
}

export default SettingsPage;
