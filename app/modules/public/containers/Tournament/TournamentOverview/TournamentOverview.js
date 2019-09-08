import React from 'react';
import PropTypes from 'prop-types';
import { tournamentPropType } from '@/modules/public/propTypes';
import TournamentOverviewComponent from '@/modules/public/components/Tournament/TournamentDetail/TournamentOverview';
import {
  actions as documentActions,
  selectors as documentSelectors,
} from '@/modules/public/ducks/documents';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Spin from '@/modules/shared/components/Spin';
import TournamentPageTitle from '@/modules/public/components/Tournament/TournamentDetail/TournamentPageTitle';

/* eslint-disable react/prefer-stateless-function */
export class TournamentOverview extends React.PureComponent {
  componentDidMount() {
    this.props.fetchDocuments(this.props.tournament.id);
  }

  render() {
    return (
      <div>
        <TournamentPageTitle tournament={this.props.tournament} />

        <Spin spinning={this.props.isFetchingDocuments}>
          <TournamentOverviewComponent
            tournament={this.props.tournament}
            documents={this.props.documents}
          />
        </Spin>
      </div>
    );
  }
}

TournamentOverview.propTypes = {
  tournament: PropTypes.shape(tournamentPropType).isRequired,
  documents: PropTypes.arrayOf(PropTypes.object),
  isFetchingDocuments: PropTypes.bool.isRequired,
  fetchDocuments: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchDocuments: tournamentId =>
      dispatch(
        documentActions.fetchMany({
          count: 100,
          sortBy: 'name',
          asc: true,
          tournamentId,
        }),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetchingDocuments: documentSelectors.isFetching,
  documents: documentSelectors.getItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(TournamentOverview);
