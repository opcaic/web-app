import React from 'react';
import PropTypes from 'prop-types';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import PageContent from '@/modules/public/components/layout/PageContent';
import PageTitle from '@/modules/shared/components/PageTitle';
import Container from '@/modules/public/components/layout/Container';

const StaticPage = props => (
  <PageLayout>
    <PageTitle title={props.title} />

    <Container>
      <PageContent title={props.title}>{props.children}</PageContent>
    </Container>
  </PageLayout>
);

StaticPage.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
};

export default StaticPage;
