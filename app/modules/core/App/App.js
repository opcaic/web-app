import React from 'react';
import { Switch } from 'react-router-dom';
import PublicRouter from '@/modules/public/router';
import GlobalStyle from '../../../global-styles';

export default function App() {
  return (
    <div>
      <GlobalStyle />
      <Switch>
        <PublicRouter />
      </Switch>
    </div>
  );
}
