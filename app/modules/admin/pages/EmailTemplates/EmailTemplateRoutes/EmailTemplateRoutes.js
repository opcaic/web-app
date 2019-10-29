import React from 'react';
import { Route, Switch } from 'react-router-dom';
import withMenuSync from '@/modules/shared/helpers/hocs/withMenuSync';
import EmailTemplateListPage from '../EmailTemplateListPage/EmailTemplateListPage';
import EmailTemplateDetailPage from '../EmailTemplateDetailPage/EmailTemplateDetailPage';

const EmailTemplateRoutes = () => (
  <Switch>
    <Route
      exact
      path="/admin/emailTemplates/"
      component={withMenuSync(EmailTemplateListPage, {
        adminSidebar: ['email_templates'],
      })}
    />
    <Route
      path="/admin/emailTemplates/:name/:languageCode"
      component={withMenuSync(EmailTemplateDetailPage, {
        adminSidebar: ['email_templates'],
      })}
    />
  </Switch>
);

export default EmailTemplateRoutes;
