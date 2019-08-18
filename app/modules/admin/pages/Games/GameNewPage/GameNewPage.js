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

/* eslint-disable react/prefer-stateless-function */
class GameNewPage extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <Row>
          <Col span={12}>
            <GameForm
              resource={{}}
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

GameNewPage.propTypes = {
  createResource: PropTypes.func.isRequired,
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
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: gamesSelectors.isFetchingItem,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(GameNewPage);
