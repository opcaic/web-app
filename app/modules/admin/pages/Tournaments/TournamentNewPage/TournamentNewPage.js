import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Col, Row, Spin } from 'antd';
import PropTypes from 'prop-types';
import { actions as tournamentsActions } from '@/modules/admin/ducks/tournaments';
import {
  actions as gameActions,
  selectors as gameSelectors,
} from '@/modules/admin/ducks/games';
import TournamentForm from '@/modules/admin/components/Tournament/TournamentForm';
import PageLayout from '@/modules/admin/components/layout/PageLayout';

/* eslint-disable react/prefer-stateless-function */
class TournamentNewPage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    if (!this.props.games.length || this.props.isFetchingGames) {
      return (
        <PageLayout>
          <Spin />
        </PageLayout>
      );
    }

    return (
      <PageLayout>
        <Row>
          <Col span={12}>
            <TournamentForm
              resource={{}}
              games={this.props.games}
              onSubmit={(values, successCallback, failureCallback) =>
                this.props.createResource(
                  values,
                  successCallback,
                  failureCallback,
                )
              }
            />
          </Col>
        </Row>
      </PageLayout>
    );
  }
}

TournamentNewPage.propTypes = {
  createResource: PropTypes.func.isRequired,
  games: PropTypes.arrayOf(PropTypes.object),
  isFetchingGames: PropTypes.bool.isRequired,
  fetchGames: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    createResource: (resource, successCallback, failureCallback) =>
      dispatch(
        tournamentsActions.createResource(resource, {
          meta: {
            successCallback,
            failureCallback,
          },
        }),
      ),
    fetchGames: () =>
      dispatch(
        gameActions.fetchMany({
          count: 100,
          sortBy: 'name',
          asc: true,
        }),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetchingGames: gameSelectors.isFetching,
  games: gameSelectors.getItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentNewPage);
