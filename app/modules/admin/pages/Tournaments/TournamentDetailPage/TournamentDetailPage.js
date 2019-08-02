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

/* eslint-disable react/prefer-stateless-function */
class TournamentDetailPage extends React.PureComponent {
  componentWillMount() {
    this.props.fetchResource(this.props.match.params.id);
    this.props.fetchGames();
  }

  handleSubmit = values => {
    const resource = Object.assign({}, this.props.resource, values);
    this.props.updateResource(resource);
  };

  render() {
    // TODO: handle better
    if (
      this.props.resource === null ||
      this.props.isFetching ||
      this.props.isFetchingGames
    ) {
      return <Spin />;
    }

    return (
      <Spin spinning={this.props.isFetching || this.props.isFetchingGames}>
        <Row>
          <Col span={12}>
            <TournamentForm
              resource={this.props.resource || {}}
              onSubmit={values => this.handleSubmit(values)}
              games={this.props.games}
            />
          </Col>
        </Row>
      </Spin>
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
    updateResource: resource =>
      dispatch(tournamentsActions.updateResource(resource.id, resource)),
    fetchGames: () =>
      dispatch(
        gameActions.fetchMany({
          params: {
            count: 1000,
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
