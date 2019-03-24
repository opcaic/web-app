import React from 'react';
import { Switch, Route } from 'react-router-dom';
import OverviewContainer from '@public/containers/Competition/OverviewContainer';
import PageLayout from '@public/components/layout/PageLayout';

export default function Competition(props) {
  return (
    <PageLayout>
      <Switch>
        <Route path="/" component={OverviewContainer} />
      </Switch>
    </PageLayout>
  );
}
