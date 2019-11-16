import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ListCard from '@/modules/public/components/ListCard';
import { tournamentListItemPropType } from '@/modules/public/utils/propTypes';
import { dateDiffInDays } from '@/modules/shared/helpers/time';
import { FormattedMessage } from 'react-intl';
import {
  tournamentAvailabilityEnum,
  tournamentScopeEnum,
  tournamentSimplifiedStateEnum,
  tournamentStateEnum,
} from '@/modules/shared/helpers/enumHelpers';
import { getFooterTags } from '@/modules/public/components/Tournament/TournamentCard/logic';
import TimeAgo from '@/modules/shared/components/TimeAgo';
import {
  acceptsSubmissions,
  getSimplifiedState,
} from '@/modules/shared/helpers/resources/tournaments';
import { breakpoints } from '@/modules/shared/helpers/responsive';

const Game = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.85);
`;

const Deadline = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 3px;
`;

const HeaderTag = styled(Tag)`
  margin-bottom: 3px !important;
`;

const StyledListCard = styled(ListCard)`
  min-height: 360px;

  & .ant-tag {
    margin-bottom: 5px;
  }

  & .ant-tag:last-child {
    margin-right: 0px;
  }

  @media ${breakpoints.lg} {
    min-height: 310px;

    & .ant-tag {
      margin-bottom: 0px;
    }
  }
`;

const TournamentCard = props => {
  const headerTags = [];

  if (
    props.tournament.scope === tournamentScopeEnum.DEADLINE &&
    props.tournament.state === tournamentStateEnum.PUBLISHED
  ) {
    const dayDiff = dateDiffInDays(
      new Date(),
      new Date(props.tournament.deadline),
    );
    if (dayDiff < 14) {
      headerTags.push(
        <HeaderTag color="#f50" key="ending-soon">
          <FormattedMessage
            id="app.public.tournamentCard.endingSoon"
            values={{ days: dayDiff }}
          />
        </HeaderTag>,
      );
    }
  }

  if (props.tournament.availability === tournamentAvailabilityEnum.PRIVATE) {
    headerTags.push(
      <HeaderTag color="#000" key="invited-only">
        <FormattedMessage id="app.public.tournamentCard.invitedOnly" />
      </HeaderTag>,
    );
  }

  return (
    <StyledListCard
      title={props.tournament.name}
      titleUrl={`/tournaments/${props.tournament.id}`}
      imageUrl={props.tournament.imageUrl}
      headerUrl={`/tournaments/${props.tournament.id}`}
      headerTags={headerTags}
      footerTags={getFooterTags(props.tournament, props.updateFilter)}
    >
      <Deadline>
        {acceptsSubmissions(props.tournament) ? (
          <div>
            <FormattedMessage id="app.public.tournamentCard.deadline" />{' '}
            {props.tournament.scope === tournamentScopeEnum.DEADLINE ? (
              <TimeAgo date={props.tournament.deadline} />
            ) : (
              <FormattedMessage id="app.public.tournamentCard.noDeadline" />
            )}
          </div>
        ) : (
          <div>
            <FormattedMessage id="app.public.tournamentCard.state" />{' '}
            {props.tournament.state === tournamentStateEnum.FINISHED ? (
              <span>
                <FormattedMessage id="app.public.tournamentCard.finished" />{' '}
                <TimeAgo date={props.tournament.evaluationFinished} />
              </span>
            ) : (
              tournamentSimplifiedStateEnum.helpers.idToText(
                getSimplifiedState(props.tournament),
              )
            )}
          </div>
        )}
      </Deadline>
      <Game>
        <FormattedMessage id="app.public.tournamentCard.game" />{' '}
        <Link to={`/games/${props.tournament.game.id}`}>
          {props.tournament.game.name}
        </Link>
      </Game>
    </StyledListCard>
  );
};

TournamentCard.propTypes = {
  tournament: PropTypes.shape(tournamentListItemPropType).isRequired,
  updateFilter: PropTypes.func,
};

export default TournamentCard;
