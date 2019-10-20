import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import {
  actions as gamesActions,
  selectors as gamesSelectors,
} from '@/modules/admin/ducks/games';
import {
  actions as workersActions,
  selectors as workersSelectors,
} from '@/modules/admin/ducks/workers';
import GameForm from '@/modules/admin/components/Game/GameForm';
import PageLayout from '@/modules/admin/components/layout/PageLayout';

/* eslint-disable react/prefer-stateless-function */
class GameNewPage extends React.PureComponent {
  componentWillMount() {
    this.props.fetchWorkers();
  }

  getSupportedGames = () => {
    const allGames = this.props.workers.map(worker => worker.games);
    return allGames.filter((item, index) => allGames.indexOf(item) !== index);
  };

  render() {
    return (
      <PageLayout>
        <Row>
          <Col span={24}>
            <GameForm
              resource={{}}
              onSubmit={(values, successCallback, failureCallback) =>
                this.props.createResource(
                  values,
                  successCallback,
                  failureCallback,
                )
              }
              supportedGameKeys={this.getSupportedGames()}
            />
          </Col>
        </Row>
      </PageLayout>
    );
  }
}

GameNewPage.propTypes = {
  createResource: PropTypes.func.isRequired,
  workers: PropTypes.array,
  fetchWorkers: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    createResource: (resource, successCallback, failureCallback) =>
      dispatch(
        gamesActions.createResource(resource, {
          meta: {
            successCallback,
            failureCallback,
          },
        }),
      ),
    fetchWorkers: () => dispatch(workersActions.fetchMany()),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: gamesSelectors.isFetchingItem,
  workers: workersSelectors.getItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(GameNewPage);
