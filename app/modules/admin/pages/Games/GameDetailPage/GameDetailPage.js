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
import GameForm from '@/modules/admin/components/Game/GameForm';
import PageLayout from '@/modules/admin/components/layout/PageLayout';
import Spin from '@/modules/shared/components/Spin';

/* eslint-disable react/prefer-stateless-function */
class GameDetailPage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchResource(this.props.match.params.id);
  }

  render() {
    return (
      <PageLayout>
        <Spin spinning={this.props.isFetching || this.props.resource === null}>
          <Row>
            <Col span={12}>
              <GameForm
                resource={this.props.resource || {}}
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

GameDetailPage.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  updateResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resource: PropTypes.object,
  match: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id => dispatch(gamesActions.fetchResource(id)),
    updateResource: (resource, successCallback, failureCallback) =>
      dispatch(
        gamesActions.updateResource(resource.id, resource, null, {
          successCallback,
          failureCallback,
        }),
      ),
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
