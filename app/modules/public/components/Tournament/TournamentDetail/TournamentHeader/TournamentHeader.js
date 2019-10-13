import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styled from 'styled-components';
import TournamentMenu from '@/modules/public/components/Tournament/TournamentDetail/TournamentMenu';
import { tournamentsMenu } from '@/modules/public/ducks/tournaments';
import withSyncedActiveItems from '@/modules/shared/helpers/hocs/withSyncedActiveItems';
import { tournamentPropType } from '@/modules/public/utils/propTypes';
import { tournamentAvailabilityEnum } from '@/modules/shared/helpers/enumHelpers';
import { acceptsSubmissions } from '@/modules/shared/helpers/resources/tournaments';
import { FormattedMessage } from 'react-intl';

const SyncedTournamentMenu = withSyncedActiveItems(
  TournamentMenu,
  'tournamentMenu',
);

const Container = styled.div`
  background-color: white;
  position: relative;
`;

const Content = styled.div`
  height: 150px;
  padding: 25px;
  color: white;
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(
      rgba(20, 20, 20, ${props => props.overlay}),
      rgba(20, 20, 20, ${props => props.overlay})
    ),
    url(${props => props.imageUrl});
`;

const Name = styled.div`
  font-size: 30px;
  font-weight: 500;
`;

const Game = styled.div`
  font-size: 18px;
  font-weight: 100;
  margin-top: -5px;
`;

const Info = styled.div`
  margin-top: 15px;
`;

const InfoItem = styled.span`
  display: inline-block;
  margin-right: 20px;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 100;
`;

const SubmitButton = styled(({ themeColor, ...rest }) => <Button {...rest} />)`
  position: absolute;
  bottom: 7px;
  right: 7px;
  border-color: ${props => props.themeColor};
  border-width: 2px;
  font-weight: 400;
  background-color: ${props => props.themeColor};
  color: white;
  border-radius: 0;

  &:hover,
  &:active,
  &:focus {
    border-color: ${props => props.themeColor};
    color: ${props => props.themeColor};
  }
`;

const TournamentHeader = props => (
  <Container>
    <Content
      imageUrl={props.tournament.imageUrl}
      overlay={props.tournament.imageOverlay}
    >
      <Name>{props.tournament.name}</Name>
      <Game>Tournament in the game {props.tournament.game.name}</Game>
      <Info>
        <InfoItem>{props.tournament.playersCount} players</InfoItem>
        <InfoItem>{props.tournament.status}</InfoItem>
        {props.tournament.availability ===
          tournamentAvailabilityEnum.PRIVATE && <InfoItem>private</InfoItem>}
      </Info>
    </Content>
    <SyncedTournamentMenu
      id={props.tournament.id}
      items={tournamentsMenu.filter(
        x => props.isLoggedIn || x.private === false,
      )}
      themeColor={props.tournament.themeColor}
    />
    {acceptsSubmissions(props.tournament) && (
      <SubmitButton
        themeColor={props.tournament.themeColor}
        onClick={() => props.showSubmissionModal()}
      >
        <FormattedMessage id="app.public.tournamentHeader.submitSolution" />
      </SubmitButton>
    )}
  </Container>
);

TournamentHeader.propTypes = {
  tournament: PropTypes.shape(tournamentPropType),
  showSubmissionModal: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default TournamentHeader;
