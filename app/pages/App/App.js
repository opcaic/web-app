import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GlobalStyle from '../../global-styles';

import Competition from '../Competition';

export default function App() {
  return (
    <div>
      <GlobalStyle />
      <Switch>
        <Route path="/" component={Competition} />
      </Switch>
    </div>
  );
}
