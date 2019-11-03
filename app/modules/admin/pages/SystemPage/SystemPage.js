import React from 'react';
import PageLayout from '@/modules/admin/components/layout/PageLayout';
import SystemWorkers from '../../containers/System/SystemWorkers/SystemWorkers';
import SystemItems from '../../containers/System/SystemItems/SystemItems';

/* eslint-disable react/prefer-stateless-function */
class SystemPage extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <SystemWorkers />

        <SystemItems />
      </PageLayout>
    );
  }
}

export default SystemPage;
