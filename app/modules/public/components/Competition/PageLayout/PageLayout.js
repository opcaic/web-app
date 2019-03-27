import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@/modules/public/containers/Competition/Menu';
import PageContent from '@/modules/public/components/Competition/PageContent';

const PageLayout = props => (
  <div>
    <Menu name="Chess" />
    <PageContent title={props.title}>{props.children}</PageContent>
  </div>
);

PageLayout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.node.isRequired,
  game: PropTypes.string.isRequired,
};

export default PageLayout;
