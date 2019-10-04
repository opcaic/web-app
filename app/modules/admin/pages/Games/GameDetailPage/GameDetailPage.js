import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import {
  actions as gamesActions,
  selectors as gamesSelectors,
} from '@/modules/admin/ducks/games';
import GameMenu from '@/modules/admin/components/Game/GameMenu';
import GameDetailRoutes from '@/modules/admin/pages/Games/GameDetailRoutes';
import withSyncedActiveItems from '@/modules/shared/helpers/hocs/withSyncedActiveItems';
import PageLayout from '@/modules/admin/components/layout/PageLayout';
import Spin from '@/modules/shared/components/Spin';

const SyncedMenu = withSyncedActiveItems(GameMenu, 'gameMenu');

class GameDetailPage extends React.Component {
  componentDidMount() {
    this.props.fetchResource(this.props.match.params.id);
  }

  render() {
    return (
      <PageLayout>
        <SyncedMenu id={this.props.match.params.id} />
        <div style={{ height: 40 }} />

        <Spin spinning={this.props.resource === null || this.props.isFetching}>
          <GameDetailRoutes resource={this.props.resource} />
        </Spin>
      </PageLayout>
    );
  }
}

GameDetailPage.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resource: PropTypes.object,
  match: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id => dispatch(gamesActions.fetchResource(id)),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: gamesSelectors.isFetchingItem,
  resource: gamesSelectors.getItem,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(GameDetailPage);
