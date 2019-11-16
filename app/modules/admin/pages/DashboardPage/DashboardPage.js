import React from 'react';
import { createStructuredSelector } from 'reselect';
import { roleSelector } from '@/modules/shared/selectors/auth';
import { connect } from 'react-redux';
import PageLayout from '@/modules/admin/components/layout/PageLayout';
import PropTypes from 'prop-types';
import RecentTournaments from '@/modules/admin/containers/Dashboard/RecentTournaments/RecentTournaments';
import FailedMatches from '@/modules/admin/containers/Dashboard/FailedMatches/FailedMatches';
import FailedSubmissions from '@/modules/admin/containers/Dashboard/FailedSubmissions/FailedSubmissions';
import InvalidSubmissions from '@/modules/admin/containers/Dashboard/InvalidSubmissions/InvalidSubmissions';
import NotImplementedGames from '@/modules/admin/containers/Dashboard/NotImplementedGames/NotImplementedGames';
import { userRoleEnum } from '@/modules/shared/helpers/enumHelpers';
import styled from 'styled-components';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/shared/utils/pageTitles';
import PageTitle from '../../../shared/components/PageTitle/PageTitle';

const Card = styled.div`
  margin-bottom: 15px;
`;

/* eslint-disable react/prefer-stateless-function */
class DashboardPage extends React.PureComponent {
  render() {
    return (
      <PageLayout renderInsideCard={false}>
        <PageTitle
          title={intlGlobal.formatMessage(pageTitles.adminDashboardPage)}
        />
        <Card>
          <RecentTournaments />
        </Card>
        <Card>
          <FailedMatches />
        </Card>
        <Card>
          <FailedSubmissions />
        </Card>
        <Card>
          <InvalidSubmissions />
        </Card>
        {this.props.role === userRoleEnum.ADMIN && (
          <Card>
            <NotImplementedGames />
          </Card>
        )}
      </PageLayout>
    );
  }
}

DashboardPage.propTypes = {
  role: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  role: roleSelector,
});

export default connect(mapStateToProps)(DashboardPage);
