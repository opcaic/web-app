import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import { fetchCompetitionsRequest } from '../../ducks/competitions/actions';
import { makeSelectCompetitions } from '@/modules/public/pages/CompetitionsPage/selectors';
import CompetitionList from '@/modules/public/components/CompetionList/CompetitionList';

/* eslint-disable react/prefer-stateless-function */
export class CompetitionsPage extends React.PureComponent {
  componentWillMount() {
    this.props.loadCompetitions();
  }

  render() {
    if (this.props.competitions === undefined) {
      return 'Loading';
    }

    return (
      <PageLayout>
        <div className="container" style={{ marginTop: 30 }}>
          <CompetitionList competitions={this.props.competitions} />
        </div>
      </PageLayout>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    loadCompetitions: () => dispatch(fetchCompetitionsRequest()),
  };
}

const mapStateToProps = createStructuredSelector({
  competitions: makeSelectCompetitions(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CompetitionsPage);
