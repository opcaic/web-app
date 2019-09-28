import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from '@/modules/shared/components/PageTitle';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import { Button, Result } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { tournamentPropType } from '@/modules/public/utils/propTypes';
import PageContent from '@/modules/public/components/layout/PageContent';

const TournamentContentNotFound = ({ tournament }) => (
  <PageContent
    title={
      <FormattedMessage id="app.public.tournamentContentNotFound.tabTitle" />
    }
    withPadding={false}
  >
    <PageTitle
      title={intlGlobal.formatMessage(pageTitles.tournamentContentNotFoundPage)}
    />

    <Result
      status="404"
      title={
        <FormattedMessage id="app.public.tournamentContentNotFound.title" />
      }
      subTitle={
        <FormattedMessage id="app.public.tournamentContentNotFound.subtitle" />
      }
      extra={
        <Button type="primary">
          <Link to={`/tournaments/${tournament.id}`}>
            <FormattedMessage id="app.public.tournamentContentNotFound.backToOverview" />
          </Link>
        </Button>
      }
    />
  </PageContent>
);

TournamentContentNotFound.propTypes = {
  tournament: PropTypes.shape(tournamentPropType),
};

export default TournamentContentNotFound;
