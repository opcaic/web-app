import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Col, Row, Spin } from 'antd';
import PropTypes from 'prop-types';
import {
  actions as gamesActions,
  selectors as gamesSelectors,
} from '@/modules/admin/ducks/games';
import GameForm from '@/modules/admin/components/Game/GameForm';
import PageLayout from '@/modules/admin/components/layout/PageLayout';

/* eslint-disable react/prefer-stateless-function */
class GameDetailPage extends React.PureComponent {
  componentWillMount() {
    this.props.fetchResource(this.props.match.params.id);
  }

  handleSubmit = values => {
    const resource = Object.assign({}, this.props.game, values);
    this.props.updateResource(resource);
  };

  render() {
    return (
      <PageLayout>
        <Spin spinning={this.props.isFetching}>
          <Row>
            <Col span={12}>
              <GameForm
                game={this.props.game || {}}
                onSubmit={values => this.handleSubmit(values)}
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
  game: PropTypes.object,
  match: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id => dispatch(gamesActions.fetchResource(id)),
    updateResource: resource =>
      dispatch(gamesActions.updateResource(resource.id, resource)),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: gamesSelectors.isFetchingItem,
  game: gamesSelectors.getItem,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(GameDetailPage);
