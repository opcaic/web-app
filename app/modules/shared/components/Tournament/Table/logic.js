import React from 'react';
import {
  addSharedPlaces,
  getParticipationUsername,
  getPlaceText,
} from '@/modules/shared/helpers/resources/leaderboards';
import { Link } from 'react-router-dom';
import { formatScore } from '@/modules/shared/helpers/resources/matches';

function getParticipationsByPlace(participations) {
  const participationsByPlace = {};
  participations.forEach((x, index) => {
    participationsByPlace[index] = x;
  });

  return participationsByPlace;
}

function getMatchId(firstPlayer, secondPlayer) {
  return `${firstPlayer.submissionId}_${secondPlayer.submissionId}`;
}

function getMatchesByParticipants(matches) {
  const matchesByParticipants = {};

  matches.forEach(match => {
    matchesByParticipants[getMatchId(match.firstPlayer, match.secondPlayer)] = {
      firstPlayerScore: formatScore(match.firstPlayer.score),
      secondPlayerScore: formatScore(match.secondPlayer.score),
      id: match.id,
    };

    matchesByParticipants[getMatchId(match.secondPlayer, match.firstPlayer)] = {
      firstPlayerScore: formatScore(match.secondPlayer.score),
      secondPlayerScore: formatScore(match.firstPlayer.score),
      id: match.id,
    };
  });

  return matchesByParticipants;
}

function getTableRows(participationsByPlace, matchesByParticipants) {
  const numberOfPlayers = Object.keys(participationsByPlace).length;
  const rows = [];

  for (let i = 0; i < numberOfPlayers; i += 1) {
    const rowMatches = [];

    const firstPlayer = participationsByPlace[i];

    for (let j = 0; j < numberOfPlayers; j += 1) {
      if (i === j) {
        rowMatches.push(null);
      } else {
        const secondPlayer = participationsByPlace[j];
        const match =
          matchesByParticipants[getMatchId(firstPlayer, secondPlayer)];

        rowMatches.push(match);
      }
    }

    rows.push({
      participation: firstPlayer,
      matches: rowMatches,
    });
  }

  return rows;
}

function getTableColumns(participationsByPlace, tournament) {
  const numberOfPlayers = Object.keys(participationsByPlace).length;
  const columns = [];

  columns.push({
    title: '',
    key: `place`,
    align: 'center',
    render: (text, record) => <span>{getPlaceText(record.participation)}</span>,
  });

  columns.push({
    title: '',
    key: `name`,

    render: (text, record) => (
      <span>
        <b>{getParticipationUsername(record.participation)}</b>
      </span>
    ),
  });

  for (let i = 0; i < numberOfPlayers; i += 1) {
    columns.push({
      title: getParticipationUsername(participationsByPlace[i]),
      key: `column_${i}`,
      align: 'center',
      render: (text, record) => {
        const match = record.matches[i];

        if (match === null) {
          return '';
        }

        const scoreText = `${match.firstPlayerScore}:${
          match.secondPlayerScore
        }`;

        if (tournament.privateMatchLog) {
          return scoreText;
        }

        return (
          <Link to={`/tournaments/${tournament.id}/matches/${match.id}`}>
            {scoreText}
          </Link>
        );
      },
    });
  }

  return columns;
}

export function getTableData(leaderboard, tournament) {
  const participationsByPlace = getParticipationsByPlace(
    addSharedPlaces(leaderboard.participations),
  );

  const matchesByParticipants = getMatchesByParticipants(leaderboard.matches);
  const tableRows = getTableRows(participationsByPlace, matchesByParticipants);
  const tableColumns = getTableColumns(participationsByPlace, tournament);

  return {
    rows: tableRows,
    columns: tableColumns,
  };
}
