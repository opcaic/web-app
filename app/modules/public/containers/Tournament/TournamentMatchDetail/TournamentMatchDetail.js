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
import MatchExecution from '@/modules/shared/components/Tournament/MatchExecution';
import PageContent from '@/modules/public/components/layout/PageContent';
import TournamentPageTitle from '@/modules/public/components/Tournament/TournamentDetail/TournamentPageTitle';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import ApiResult from '@/modules/shared/components/ApiResult';
import TournamentAdminButton from '@/modules/public/components/Tournament/TournamentDetail/TournamentAdminButton';
import { downloadFiles } from '@/modules/shared/ducks/matches';

/* eslint-disable react/prefer-stateless-function */
class TournamentMatchDetail extends React.PureComponent {
  componentDidMount() {
    this.props.fetchResource(this.props.match.params.matchId);
  }

  render() {
    const match = this.props.resource;

    return (
      <PageContent
        title={<FormattedMessage id="app.public.tournamentMatchDetail.title" />}
        buttons={[
          <Button
            type="default"
            size="small"
            style={{ marginRight: 10 }}
            key="back"
          >
            <Link to={`/tournaments/${this.props.tournament.id}/matches/`}>
              <FormattedMessage id="app.generic.backToList" />
            </Link>
          </Button>,
          <TournamentAdminButton key="admin" />,
        ]}
      >
        <TournamentPageTitle
          tournament={this.props.tournament}
          title={intlGlobal.formatMessage(pageTitles.tournamentDetailMatchPage)}
        />

        <ApiResult
          loading={this.props.isFetching || this.props.resource === null}
          error={this.props.error}
        >
          {match && (
            <MatchExecution
              matchExecution={match.lastExecution}
              match={match}
              tournament={this.props.tournament}
              isAdmin={false}
              downloadFiles={() =>
                this.props.downloadFiles(match.lastExecution.id)
              }
            />
          )}
        </ApiResult>
      </PageContent>
    );
  }
}

TournamentMatchDetail.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  downloadFiles: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resource: PropTypes.object,
  match: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired,
  error: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id => dispatch(matchesActions.fetchResource(id)),
    downloadFiles: id => dispatch(downloadFiles(id)),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: matchesSelectors.isFetchingItem,
  resource: matchesSelectors.getItem,
  error: matchesSelectors.getFetchItemError,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(TournamentMatchDetail);
