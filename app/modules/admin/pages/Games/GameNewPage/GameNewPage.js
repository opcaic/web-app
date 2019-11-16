import React from 'react';
import PageLayout from '@/modules/admin/components/layout/PageLayout';
import GameBasicInfo from '@/modules/admin/containers/Games/GameBasicInfo/GameBasicInfo';
import { pageTitles } from '@/modules/shared/utils/pageTitles';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import PageTitle from '@/modules/shared/components/PageTitle/PageTitle';

const GameNewPage = () => (
  <PageLayout>
    <PageTitle title={intlGlobal.formatMessage(pageTitles.newGamePage)} />
    <GameBasicInfo resource={{}} />
  </PageLayout>
);

export default GameNewPage;
