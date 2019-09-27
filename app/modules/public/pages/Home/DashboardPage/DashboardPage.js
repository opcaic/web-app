import React from 'react';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import PageTitle from '@/modules/shared/components/PageTitle';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import DashboardMatches from '@/modules/public/containers/HomePage/DashboardMatches';
import { Col, Row } from 'antd';
import DashboardSubmissions from '@/modules/public/containers/HomePage/DashboardSubmissions';
import DashboardTournaments from '@/modules/public/containers/HomePage/DashboardTournaments';
import Container from '@/modules/public/components/layout/Container';

/* eslint-disable react/prefer-stateless-function */
export class DashboardPage extends React.PureComponent {
  render() {
    return (
      <PageLayout
        title={intlGlobal.formatMessage(pageTitles.userDashboardPage)}
      >
        <PageTitle
          title={intlGlobal.formatMessage(pageTitles.userDashboardPage)}
        />

        <Container>
          <Row gutter={16}>
            <Col span={24}>
              <DashboardMatches />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 20 }}>
            <Col span={12}>
              <DashboardTournaments />
            </Col>
            <Col span={12}>
              <DashboardSubmissions />
            </Col>
          </Row>
        </Container>
      </PageLayout>
    );
  }
}

DashboardPage.propTypes = {};

export default DashboardPage;
