import React from 'react';
import Spin from '@/modules/shared/components/Spin';
import { Row, Col } from 'antd';
import GameForm from '@/modules/admin/components/Game/GameForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { actions as gameActions } from '@/modules/admin/ducks/games';

const GameBasicInfo = props => (
  <Spin spinning={props.isFetching || props.resource === null}>
    <Row>
      <Col span={24}>
        <GameForm
          resource={props.resource || {}}
          onSubmit={(values, successCallback, failureCallback) =>
            props.updateResource(
              Object.assign({}, props.resource, values),
              successCallback,
              failureCallback,
            )
          }
        />
      </Col>
    </Row>
  </Spin>
);

GameBasicInfo.propTypes = {
  resource: PropTypes.object,
  updateResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    updateResource: (resource, successCallback, failureCallback) =>
      dispatch(
        gameActions.updateResource(resource.id, resource, {
          meta: {
            successCallback,
            failureCallback,
          },
        }),
      ),
  };
}

const withConnect = connect(
  undefined,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(GameBasicInfo);
