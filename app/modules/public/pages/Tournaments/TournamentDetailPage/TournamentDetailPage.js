import React from 'react';
import PropTypes from 'prop-types';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import TournamentHeader from '@/modules/public/components/Tournament/TournamentDetail/TournamentHeader';
import TournamentRoutes from '@/modules/public/pages/Tournaments/TournamentRoutes';
import {
  actions as tournamentsActions,
  selectors as tournamentsSelectors,
} from '@/modules/public/ducks/tournaments';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { tournamentPropType } from '@/modules/public/propTypes';
import Spin from '@/modules/shared/components/Spin';

/* eslint-disable react/prefer-stateless-function */
export class TournamentDetailPage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchResource(this.props.match.params.id);
  }

  render() {
    return (
      <PageLayout>
        <div className="container" style={{ marginTop: 30 }}>
          <Spin
            spinning={this.props.resource === null || this.props.isFetching}
          >
            <TournamentHeader tournament={this.props.resource} />
            <TournamentRoutes tournament={this.props.resource} />
          </Spin>
        </div>
      </PageLayout>
    );
  }
}

TournamentDetailPage.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resource: PropTypes.shape(tournamentPropType),
  match: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id => dispatch(tournamentsActions.fetchResource(id)),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: tournamentsSelectors.isFetchingItem,
  resource: tournamentsSelectors.getItem,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(TournamentDetailPage);