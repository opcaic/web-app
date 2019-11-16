import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from '@/modules/shared/components/PageTitle';

const TournamentPageTitle = props => (
  <PageTitle
    title={
      props.title
        ? `${props.title} | ${props.tournament.name}`
        : props.tournament.name
    }
  />
);

TournamentPageTitle.propTypes = {
  title: PropTypes.string,
  tournament: PropTypes.object.isRequired,
};

export default TournamentPageTitle;
