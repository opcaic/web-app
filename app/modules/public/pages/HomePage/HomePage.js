import React from 'react';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Typography } from 'antd';
import { makeSelectFeaturedCompetitions } from './selectors';
import { fetchCompetitionsRequest } from '../../ducks/competitions/actions';
import CompetitionList from '../../components/CompetionList/CompetitionList';
import { Link } from 'react-router-dom';
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

export function mapDispatchToProps(dispatch) {
  return {
    loadCompetitions: () => dispatch(fetchCompetitionsRequest()),
  };
}

const mapStateToProps = createStructuredSelector({
  featuredCompetitions: makeSelectFeaturedCompetitions(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
