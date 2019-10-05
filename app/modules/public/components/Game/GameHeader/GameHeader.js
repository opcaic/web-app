import React from 'react';
import PropTypes from 'prop-types';
import { gamePropType } from '@/modules/public/utils/propTypes';
import styled from 'styled-components';
import { theme } from '@/modules/shared/helpers/utils';
import { FormattedMessage } from 'react-intl';

const Image = styled.div`
  display: inline-block;
  width: 125px;
  height: 125px;
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(
      rgba(20, 20, 20, 0.3),
      rgba(20, 20, 20, 0.3)
    ),
    url(${props => props.imageUrl});
  float: left;
`;

const Content = styled.div`
  height: 125px;
  padding-left: 150px;
`;

const Name = styled.div`
  color: ${theme.TOP_MENU_COLOR};
  font-size: 30px;
  font-weight: 400;
  margin-bottom: -5px;
`;

const ActiveTournamentCount = styled.div`
  margin-bottom: 5px;
  font-weight: 400;
  color: ${theme.TOP_MENU_COLOR};
  font-size: 16px;
`;

const Description = styled.div`
  max-width: 600px;
`;

const GameHeader = props => (
  <div>
    <Image imageUrl={props.game.imageUrl} />
    <Content>
      <Name>{props.game.name}</Name>
      <ActiveTournamentCount>
        <FormattedMessage id="app.public.gameHeader.activeTournamentsCount" />{' '}
        {props.game.activeTournamentsCount}
      </ActiveTournamentCount>
      <Description>{props.game.description}</Description>
    </Content>
  </div>
);

GameHeader.propTypes = {
  game: PropTypes.shape(gamePropType).isRequired,
};

export default GameHeader;
