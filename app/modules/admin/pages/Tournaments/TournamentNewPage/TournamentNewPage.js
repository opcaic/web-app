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

/* eslint-disable react/prefer-stateless-function */
class TournamentNewPage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchGames();
  }

  handleSubmit = values => {
    this.props.createResource(values);
  };

  render() {
    if (!this.props.games.length || this.props.isFetchingGames) {
      return <Spin />;
    }

    return (
      <Row>
        <Col span={12}>
          <TournamentForm
            resource={{}}
            onSubmit={values => this.handleSubmit(values)}
            games={this.props.games}
          />
        </Col>
      </Row>
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
    createResource: resource =>
      dispatch(tournamentsActions.createResource(resource)),
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
  isFetchingGames: gameSelectors.isFetching,
  games: gameSelectors.getItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentNewPage);
