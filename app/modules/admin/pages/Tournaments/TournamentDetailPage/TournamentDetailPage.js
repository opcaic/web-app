import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Spin } from 'antd';
import { actions as tournamentsActions } from '../../../ducks/tournaments';
import {
  makeSelectTournament,
  makeSelectTournamentIsFetching,
} from './selectors';
import TournamentForm from '../../../components/Tournament/TournamentForm';

/* eslint-disable react/prefer-stateless-function */
export class TournamentDetailPage extends React.PureComponent {
  componentWillMount() {
    this.props.fetchResource(1);
  }

  handleSubmit = values => {
    const resource = Object.assign({}, this.props.tournament, values);
    this.props.updateResource(resource);
  };

  render() {
    console.log(this.props.tournament);

    return (
      <Spin spinning={this.props.isFetching}>
        <TournamentForm
          {...this.props.tournament}
          onSubmit={values => this.handleSubmit(values)}
          onChange={changedFields => console.log(changedFields)}
        />
      </Spin>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id => dispatch(tournamentsActions.fetchResource(id)),
    updateResource: resource =>
      dispatch(tournamentsActions.updateResource(resource.id, resource)),
  };
}

const mapStateToProps = createStructuredSelector({
  tournament: makeSelectTournament(),
  isFetching: makeSelectTournamentIsFetching(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentDetailPage);
