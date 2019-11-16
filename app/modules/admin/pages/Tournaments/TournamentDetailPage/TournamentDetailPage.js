import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import {
  actions as tournamentsActions,
  selectors as tournamentsSelectors,
} from '@/modules/admin/ducks/tournaments';
import PageLayout from '@/modules/admin/components/layout/PageLayout';
import TournamentMenu from '@/modules/admin/components/Tournament/TournamentMenu';
import { withRouter } from 'react-router-dom';
import withSyncedActiveItems from '@/modules/shared/helpers/hocs/withSyncedActiveItems';
import TournamentDetailRoutes from '@/modules/admin/pages/Tournaments/TournamentDetailRoutes';
import Spin from '@/modules/shared/components/Spin';

const SyncedTournamentMenu = withSyncedActiveItems(
  TournamentMenu,
  'tournamentMenu',
);

/* eslint-disable react/prefer-stateless-function */
class TournamentDetailPage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchResource(this.props.match.params.id);
  }

  render() {
    return (
      <PageLayout>
        <SyncedTournamentMenu id={this.props.match.params.id} />
        <div style={{ height: 40 }} />

        <Spin spinning={this.props.resource === null || this.props.isFetching}>
          <TournamentDetailRoutes tournament={this.props.resource} />
        </Spin>
      </PageLayout>
    );
  }
}

TournamentDetailPage.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resource: PropTypes.object,
  match: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id =>
      dispatch(
        tournamentsActions.fetchResource(id, {
          endpointParams: { useAdminSuffix: true },
        }),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: tournamentsSelectors.isFetchingItem,
  resource: tournamentsSelectors.getItem,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(TournamentDetailPage);
