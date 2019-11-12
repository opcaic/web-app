import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  getActionProps,
  getDetailActionProps,
  getSearchProps,
  getThemedDetailActionProps,
} from '@/modules/shared/helpers/table';
import { Table, Button } from 'antd';
import styled from 'styled-components';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import {
  matchStateEnum,
  tournamentFormatEnum,
  tournamentStateEnum,
} from '@/modules/shared/helpers/enumHelpers';
import PropTypes from 'prop-types';
import {
  formatScore,
  getBestScore,
  getSubmissionUsername,
} from '@/modules/shared/helpers/resources/matches';
import TimeAgo from '@/modules/shared/components/TimeAgo/TimeAgo';

function prepareColumns({
  tournament,
  isAdmin,
  createMatchExecution,
  queuedMatchId,
}) {
  const columns = [];

  // Queued
  if (isAdmin) {
    columns.push({
      title: <FormattedMessage id="app.shared.matchList.queued" />,
      key: 'queued',
      width: 200,
      align: 'center',
      render: (text, record) => <TimeAgo date={record.lastExecution.created} />,
    });
  }

  // Executed
  columns.push({
    title: isAdmin ? (
      <FormattedMessage id="app.shared.matchList.executed" />
    ) : (
      <FormattedMessage id="app.shared.matchList.date" />
    ),
    key: 'executed',
    width: 200,
    align: 'center',
    render: (text, record) => {
      if (record.state === matchStateEnum.QUEUED) {
        return null;
      }

      return <TimeAgo date={record.lastExecution.executed} />;
    },
  });

  // Players and scores
  columns.push({
    title: <FormattedMessage id="app.shared.matchList.players" />,
    key: 'username',
    render: (text, record) => {
      const isSinglePlayer =
        tournament.format === tournamentFormatEnum.SINGLE_PLAYER;
      const bestScore = getBestScore(
        record.lastExecution.botResults,
        tournament.rankingStrategy,
      );

      if (record.state === matchStateEnum.QUEUED) {
        return record.submissions.map((x, index) => [
          <span key={`sep_${x.id}`}>{index ? ' vs ' : ''}</span>,
          <span key={x.id}>{getSubmissionUsername(x)} </span>,
        ]);
      }

      return record.lastExecution.botResults.map((x, index) => [
        <span key={`sep_${x.submission.id}`}>{index ? ' vs ' : ''}</span>,
        <span
          key={x.submission.id}
          style={{
            fontWeight:
              x.score === bestScore &&
              record.state === matchStateEnum.EXECUTED &&
              !isSinglePlayer
                ? 700
                : 400,
          }}
        >
          {getSubmissionUsername(x.submission)}{' '}
          {record.state === matchStateEnum.EXECUTED && !isSinglePlayer ? (
            <span>({formatScore(x.score)})</span>
          ) : null}
        </span>,
      ]);
    },
    ...getSearchProps('username'),
  });

  // Score for single player
  if (tournament.format === tournamentFormatEnum.SINGLE_PLAYER) {
    columns.push({
      title: <FormattedMessage id="app.shared.matchList.score" />,
      key: 'score',
      width: 200,
      render: (text, record) =>
        record.state === matchStateEnum.EXECUTED
          ? record.lastExecution.botResults[0].score
          : null,
    });
  }

  // State
  if (isAdmin) {
    columns.push({
      title: <FormattedMessage id="app.shared.matchList.state" />,
      dataIndex: 'state',
      key: 'state',
      width: 200,
      render: (text, record) => matchStateEnum.helpers.idToText(record.state),
      filters: matchStateEnum.helpers.getFilterOptions(),
      filterMultiple: false,
    });
  }

  // Detail button
  if (isAdmin) {
    columns.push({
      ...getDetailActionProps(
        record =>
          `/admin/tournaments/${record.tournament.id}/matches/${record.id}`,
      ),
    });
    if (tournament.state === tournamentStateEnum.RUNNING)
      columns.push({
        ...getActionProps(
          (text, record) => (
            <Button
              disabled={record.state !== matchStateEnum.FAILED}
              loading={queuedMatchId === record.id}
              onClick={() => createMatchExecution(record.id)}
            >
              <FormattedMessage id="app.admin.matchList.rematch" />
            </Button>
          ),
          'rematch',
        ),
      });
  } else {
    columns.push({
      ...getThemedDetailActionProps(
        record => `/tournaments/${record.tournament.id}/matches/${record.id}`,
      ),
    });
  }

  return columns;
}

const StyledTable = styled(Table)`
  & .ant-pagination.ant-table-pagination {
    ${props => (!props.isAdmin ? 'margin-right: 16px;' : '')};
  }
`;

const MatchList = props => (
  <StyledTable
    columns={prepareColumns(props)}
    rowKey={record => record.id}
    locale={{
      emptyText: (
        <EmptyTablePlaceholder
          text={
            props.emptyText ? (
              props.emptyText
            ) : (
              <FormattedMessage id="app.shared.matchList.noMatches" />
            )
          }
        />
      ),
    }}
    {...props}
  />
);

MatchList.propTypes = {
  emptyText: PropTypes.node,
};

export default withAjax(MatchList);
