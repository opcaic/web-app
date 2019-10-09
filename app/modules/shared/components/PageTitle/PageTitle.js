import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { settings } from '@/modules/shared/helpers/utils';

const PageTitle = props => (
  <Helmet>
    <title>
      {props.title} | {settings.appName}
    </title>
  </Helmet>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
