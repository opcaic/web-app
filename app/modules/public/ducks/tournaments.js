import { FormattedMessage } from 'react-intl';
import React from 'react';
import resourceFactory from '../../shared/helpers/resourceManager';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  endpoint: 'api/tournaments',
  resourceName: 'tournaments',
});

// TODO: handle properly
export const tournamentsMenu = [
  {
    key: 'overview',
    text: <FormattedMessage id="app.public.tournamentsMenu.overview" />,
    path: '',
    private: false,
  },
  {
    key: 'leaderboard',
    text: <FormattedMessage id="app.public.tournamentsMenu.leaderboard" />,
    path: 'leaderboard',
    private: false,
  },
  {
    key: 'matches',
    text: <FormattedMessage id="app.public.tournamentsMenu.matches" />,
    path: 'matches',
    private: false,
  },
  {
    key: 'mySubmissions',
    text: <FormattedMessage id="app.public.tournamentsMenu.mySubmissions" />,
    path: 'submissions',
    private: true,
  },
  {
    key: 'myMatches',
    text: <FormattedMessage id="app.public.tournamentsMenu.myMatches" />,
    path: 'my-matches',
    private: true,
  },
];

export default reducers;
