import React from 'react';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Typography } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeSelectFeaturedCompetitions } from './selectors';
import { actions as tournamentActions } from '../../ducks/tournaments';
import CompetitionList from '../../components/CompetionList/CompetitionList';
const { Title } = Typography;

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  componentWillMount() {
    this.props.loadCompetitions();
  }

  render() {
    if (this.props.featuredCompetitions === undefined) {
      return 'Loading';
    }

    return (
      <PageLayout>
        <div className="container" style={{ marginTop: 30 }}>
          <Title
            level={1}
            style={{ textAlign: 'center', margin: 60, fontSize: 60 }}
          >
            Imagine a cool title here
          </Title>
          <Title level={2}>Featured competitions</Title>
          <CompetitionList competitions={this.props.featuredCompetitions} />
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" size="large">
              <Link to="/competitions">Browse all competitions</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }
}

HomePage.propTypes = {
  featuredCompetitions: PropTypes.array,
  loadCompetitions: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    loadCompetitions: () => dispatch(tournamentActions.fetchMany()),
  };
}

const mapStateToProps = createStructuredSelector({
  featuredCompetitions: makeSelectFeaturedCompetitions(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(HomePage);
