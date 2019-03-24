import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Competition from '@public/pages/Competition';

export default function PublicRouter() {
  return (
    <Switch>
      <Route path="/competition/:slug" component={Competition} />
    </Switch>
  );
}
