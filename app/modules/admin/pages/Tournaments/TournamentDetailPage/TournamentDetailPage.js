import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Col, Row, Spin } from 'antd';
import PropTypes from 'prop-types';
import {
  actions as tournamentsActions,
  selectors as tournamentsSelectors,
} from '@/modules/admin/ducks/tournaments';
import {
  actions as gameActions,
  selectors as gameSelectors,
} from '@/modules/admin/ducks/games';
import TournamentForm from '@/modules/admin/components/Tournament/TournamentForm';
import PageLayout from '@/modules/admin/components/layout/PageLayout';

/* eslint-disable react/prefer-stateless-function */
class TournamentDetailPage extends React.PureComponent {
  componentWillMount() {
    this.props.fetchResource(this.props.match.params.id);
    this.props.fetchGames();
  }

  render() {
    // // TODO: handle better
    if (
      this.props.resource === null ||
      this.props.isFetching ||
      this.props.isFetchingGames
    ) {
      return (
        <PageLayout>
          <Spin />
        </PageLayout>
      );
    }

    return (
      <PageLayout>
        <Spin spinning={this.props.isFetching || this.props.isFetchingGames}>
          <Row>
            <Col span={12}>
              <TournamentForm
                resource={this.props.resource || {}}
                games={this.props.games}
                onSubmit={(values, successCallback, failureCallback) =>
                  this.props.updateResource(
                    Object.assign({}, this.props.resource, values),
                    successCallback,
                    failureCallback,
                  )
                }
              />
            </Col>
          </Row>
        </Spin>
      </PageLayout>
    );
  }
}

TournamentDetailPage.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  updateResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resource: PropTypes.object,
  match: PropTypes.object.isRequired,
  games: PropTypes.arrayOf(PropTypes.object),
  isFetchingGames: PropTypes.bool.isRequired,
  fetchGames: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id => dispatch(tournamentsActions.fetchResource(id)),
    updateResource: (resource, successCallback, failureCallback) =>
      dispatch(
        tournamentsActions.updateResource(resource.id, resource, null, {
          successCallback,
          failureCallback,
        }),
      ),
    fetchGames: () =>
      dispatch(
        gameActions.fetchMany({
          params: {
            count: 100,
            sortBy: 'name',
            asc: true,
          },
        }),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: tournamentsSelectors.isFetchingItem,
  resource: tournamentsSelectors.getItem,
  isFetchingGames: gameSelectors.isFetching,
  games: gameSelectors.getItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentDetailPage);
