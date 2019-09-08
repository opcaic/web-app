import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import {
  actions as matchesActions,
  selectors as matchesSelectors,
} from '@/modules/public/ducks/matches';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Spin from '@/modules/shared/components/Spin';
import MatchExecution from '@/modules/shared/components/Tournament/MatchExecution';
import { addLastExecution } from '@/modules/shared/helpers/matches';
import PageContent from '@/modules/public/components/Tournament/PageContent';
import TournamentPageTitle from '@/modules/public/components/Tournament/TournamentDetail/TournamentPageTitle';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/pageTitles';

/* eslint-disable react/prefer-stateless-function */
class TournamentMatchDetail extends React.PureComponent {
  componentDidMount() {
    this.props.fetchResource(this.props.match.params.matchId);
  }

  render() {
    const match =
      this.props.resource === null
        ? null
        : addLastExecution(this.props.resource);

    return (
      <PageContent
        title={<FormattedMessage id="app.public.tournamentMatchDetail.title" />}
      >
        <TournamentPageTitle
          tournament={this.props.tournament}
          title={intlGlobal.formatMessage(pageTitles.tournamentDetailMatchPage)}
        />

        <Spin spinning={this.props.isFetching || this.props.resource === null}>
          <Button type="default" style={{ marginBottom: 20 }}>
            <Link to={`/tournaments/${this.props.tournament.id}/matches/`}>
              <FormattedMessage id="app.generic.backToList" />
            </Link>
          </Button>

          <MatchExecution
            matchExecution={match && match.lastExecution}
            match={match}
            tournament={this.props.tournament}
            isAdmin={false}
          />
        </Spin>
      </PageContent>
    );
  }
}

TournamentMatchDetail.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resource: PropTypes.object,
  match: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id => dispatch(matchesActions.fetchResource(id)),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: matchesSelectors.isFetchingItem,
  resource: matchesSelectors.getItem,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(TournamentMatchDetail);
