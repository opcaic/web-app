import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// eslint-disable-next-line prefer-destructuring
const APP_NAME = process.env.APP_NAME;

const PageTitle = props => (
  <Helmet>
    <title>
      {props.title} | {APP_NAME}
    </title>
  </Helmet>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
