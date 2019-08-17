import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import TournamentForm from '@/modules/admin/components/Tournament/TournamentForm';
import {
  actions as gameActions,
  selectors as gameSelectors,
} from '@/modules/admin/ducks/games';
import { actions as tournamentsActions } from '@/modules/admin/ducks/tournaments';
import Spin from '@/modules/shared/components/Spin';

/* eslint-disable react/prefer-stateless-function */
class TournamentBasicInfo extends React.PureComponent {
  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    return (
      <Spin spinning={this.props.isFetchingGames}>
        <Row>
          <Col span={12}>
            <TournamentForm
              resource={this.props.resource || {}}
              games={this.props.games}
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
    );
  }
}

TournamentBasicInfo.propTypes = {
  updateResource: PropTypes.func.isRequired,
  resource: PropTypes.object.isRequired,
  games: PropTypes.arrayOf(PropTypes.object),
  isFetchingGames: PropTypes.bool.isRequired,
  fetchGames: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    updateResource: (resource, successCallback, failureCallback) =>
      dispatch(
        tournamentsActions.updateResource(resource.id, resource, null, {
          successCallback,
          failureCallback,
        }),
      ),
    fetchGames: () =>
      dispatch(
        gameActions.fetchMany({
          params: {
            count: 100,
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

export default compose(withConnect)(TournamentBasicInfo);
