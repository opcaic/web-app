import React from 'react';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import { Typography } from 'antd';
import FeaturedTournaments from '@/modules/public/containers/HomePage/FeaturedTournaments';
import FeaturedGames from '@/modules/public/containers/HomePage/FeaturedGames';
import PageTitle from '@/modules/shared/components/PageTitle';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import Container from '@/modules/public/components/layout/Container';
const { Title } = Typography;

/* eslint-disable react/prefer-stateless-function */
export class LandingPage extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <PageTitle title={intlGlobal.formatMessage(pageTitles.homePage)} />

        <Container>
          <Title
            level={1}
            style={{ textAlign: 'center', margin: 60, fontSize: 60 }}
          >
            Imagine a cool title here
          </Title>
        </Container>

        <FeaturedTournaments />
        <FeaturedGames />
      </PageLayout>
    );
  }
}

LandingPage.propTypes = {};

export default LandingPage;
