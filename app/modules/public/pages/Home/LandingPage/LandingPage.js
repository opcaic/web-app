import React from 'react';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import FeaturedTournaments from '@/modules/public/containers/HomePage/FeaturedTournaments';
import FeaturedGames from '@/modules/public/containers/HomePage/FeaturedGames';
import PageTitle from '@/modules/shared/components/PageTitle';
import { pageTitles } from '@/modules/shared/utils/pageTitles';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import Banner from '@/modules/public/components/Home/Banner';

/* eslint-disable react/prefer-stateless-function */
export class LandingPage extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <PageTitle title={intlGlobal.formatMessage(pageTitles.homePage)} />

        <Banner />
        <FeaturedTournaments />
        <FeaturedGames />
      </PageLayout>
    );
  }
}

LandingPage.propTypes = {};

export default LandingPage;
