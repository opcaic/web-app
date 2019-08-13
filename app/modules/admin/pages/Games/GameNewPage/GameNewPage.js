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
  handleSubmit = values => {
    this.props.createResource(values);
  };

  render() {
    return (
      <PageLayout>
        <Row>
          <Col span={12}>
            <GameForm
              game={{}}
              onSubmit={values => this.handleSubmit(values)}
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
    createResource: resource => dispatch(gamesActions.createResource(resource)),
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
