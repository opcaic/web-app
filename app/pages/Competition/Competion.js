import React from 'react';
import { Switch, Route } from 'react-router-dom';
import OverviewContainer from '@/containers/Competition/OverviewContainer';

export default function Competition() {
  return (
    <Switch>
      <Route path="/" component={OverviewContainer} />
    </Switch>
  );
}
