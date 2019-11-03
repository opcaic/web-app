import React from 'react';
import Spin from '@/modules/shared/components/Spin';
import { Row, Col } from 'antd';
import GameForm from '@/modules/admin/components/Game/GameForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { actions as gameActions } from '@/modules/admin/ducks/games';
import {
  actions as workersActions,
  selectors as workerSelectors,
} from '@/modules/admin/ducks/workers';
import { createStructuredSelector } from 'reselect';

class GameBasicInfo extends React.Component {
  componentWillMount() {
    this.props.fetchWorkers();
  }

  getSupportedGames = () => {
    const allGames = this.props.workers
      .map(worker => worker.games)
      .reduce((acc, vals) => acc.concat(vals), []);

    return allGames.filter((item, index) => allGames.indexOf(item) === index);
  };

  updateResource = (values, successCallback, failureCallback) =>
    this.props.updateResource(
      Object.assign({}, this.props.resource, values),
      successCallback,
      failureCallback,
    );

  createResource = (values, successCallback, failureCallback) =>
    this.props.createResource(values, successCallback, failureCallback);

  render() {
    return (
      <Spin spinning={this.props.isFetching || this.props.resource === null}>
        <Row>
          <Col span={24}>
            <GameForm
              resource={this.props.resource}
              onSubmit={
                this.props.resource.id
                  ? this.updateResource
                  : this.createResource
              }
              supportedGameKeys={this.getSupportedGames()}
            />
          </Col>
        </Row>
      </Spin>
    );
  }
}

GameBasicInfo.propTypes = {
  resource: PropTypes.object,
  updateResource: PropTypes.func.isRequired,
  createResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  workers: PropTypes.array,
  fetchWorkers: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  workers: workerSelectors.getItems,
});

export function mapDispatchToProps(dispatch) {
  return {
    createResource: (resource, successCallback, failureCallback) =>
      dispatch(
        gameActions.createResource(resource, {
          meta: {
            successCallback,
            failureCallback,
          },
        }),
      ),
    updateResource: (resource, successCallback, failureCallback) =>
      dispatch(
        gameActions.updateResource(resource.id, resource, {
          meta: {
            successCallback,
            failureCallback,
          },
        }),
      ),
    fetchWorkers: () => dispatch(workersActions.fetchMany()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(GameBasicInfo);
