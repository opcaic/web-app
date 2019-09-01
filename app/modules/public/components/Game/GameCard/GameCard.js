import React from 'react';
import PropTypes from 'prop-types';
import ListCard from '@/modules/public/components/ListCard';
import { gamePropType } from '@/modules/public/propTypes';

const GameCard = props => (
  <ListCard
    title={props.game.name}
    titleUrl={`/games/${props.game.id}`}
    imageUrl={props.game.imageUrl}
    headerUrl={`/games/${props.game.id}`}
  >
    <div>Active tournaments: {props.game.activeTournamentsCount}</div>
  </ListCard>
);

GameCard.propTypes = {
  game: PropTypes.shape(gamePropType).isRequired,
};

export default GameCard;
