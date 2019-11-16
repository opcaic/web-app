import React from 'react';
import PageLayout from '@/modules/admin/components/layout/PageLayout';
import SystemWorkers from '../../containers/System/SystemWorkers/SystemWorkers';
import SystemItems from '../../containers/System/SystemItems/SystemItems';
import { pageTitles } from '@/modules/shared/utils/pageTitles';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import PageTitle from '@/modules/shared/components/PageTitle/PageTitle';

/* eslint-disable react/prefer-stateless-function */
class SystemPage extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <PageTitle title={intlGlobal.formatMessage(pageTitles.systemPage)} />
        <SystemWorkers />

        <SystemItems />
      </PageLayout>
    );
  }
}

export default SystemPage;
