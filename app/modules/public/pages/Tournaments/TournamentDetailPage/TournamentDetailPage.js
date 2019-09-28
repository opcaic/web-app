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
import { tournamentPropType } from '@/modules/public/utils/propTypes';
import Spin from '@/modules/shared/components/Spin';
import SubmissionUpload from '@/modules/shared/containers/Tournament/SubmissionUpload';
import { showSubmissionModal } from '@/modules/shared/ducks/submission';
import Container from '@/modules/public/components/layout/Container';
import { isLoggedIn } from '@/modules/shared/selectors/auth';

/* eslint-disable react/prefer-stateless-function */
export class TournamentDetailPage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchResource(this.props.match.params.id);
  }

  render() {
    return (
      <PageLayout>
        <Container>
          <Spin
            spinning={this.props.resource === null || this.props.isFetching}
          >
            <TournamentHeader
              tournament={this.props.resource}
              showSubmissionModal={() =>
                this.props.showSubmissionModal(this.props.resource)
              }
              isLoggedIn={this.props.isLoggedIn}
            />
            <TournamentRoutes tournament={this.props.resource} />
            <SubmissionUpload />
          </Spin>
        </Container>
      </PageLayout>
    );
  }
}

TournamentDetailPage.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resource: PropTypes.shape(tournamentPropType),
  match: PropTypes.object.isRequired,
  showSubmissionModal: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id => dispatch(tournamentsActions.fetchResource(id)),
    showSubmissionModal: tournament =>
      dispatch(showSubmissionModal(tournament)),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: tournamentsSelectors.isFetchingItem,
  resource: tournamentsSelectors.getItem,
  isLoggedIn,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(TournamentDetailPage);
