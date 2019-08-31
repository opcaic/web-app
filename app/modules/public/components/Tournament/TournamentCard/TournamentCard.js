import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ListCard from '@/modules/public/components/ListCard';
import { tournamentListItemPropType } from '@/modules/public/propTypes';
import { dateDiffInDays } from '@/modules/shared/helpers/time';
import { FormattedMessage } from 'react-intl';
import { tournamentScopeEnum } from '@/modules/shared/helpers/enumHelpers';

const Game = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.85);
`;

const TournamentCard = props => {
  const headerTags = [];

  // TODO: fix when api is ready
  if (props.tournament.scope === tournamentScopeEnum.DEADLINE) {
    const dayDiff = dateDiffInDays(
      new Date(),
      new Date(props.tournament.deadline),
    );
    if (dayDiff < 14) {
      headerTags.push(
        <Tag color="#f50" key="ending-soon">
          <FormattedMessage
            id="app.public.tournamentCard.endingSoon"
            values={{ days: dayDiff }}
          />
        </Tag>,
      );
    }
  }

  // if (props.tournament.availability === 2) {
  //   headerTags.push(
  //     <Tag color="#f39c12" key="private">
  //       Private - invited
  //     </Tag>,
  //   );
  // }

  return (
    <ListCard
      title={props.tournament.name}
      titleUrl={`/tournaments/${props.tournament.id}`}
      image={props.tournament.image}
      headerUrl={`/tournaments/${props.tournament.id}`}
      headerTags={headerTags}
      footerTags={props.tournament.footerTags.map(x => (
        <Tag key={x}>{x}</Tag>
      ))}
      style={{ minHeight: 310 }}
    >
      <Game>
        Game:{' '}
        <Link to={`/games/${props.tournament.game.name}`}>
          {props.tournament.game.name}
        </Link>
      </Game>
    </ListCard>
  );
};

TournamentCard.propTypes = {
  tournament: PropTypes.shape(tournamentListItemPropType).isRequired,
};

export default TournamentCard;
