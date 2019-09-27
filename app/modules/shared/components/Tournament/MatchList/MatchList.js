import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  getDetailActionProps,
  getSearchProps,
  getThemedDetailActionProps,
} from '@/modules/shared/helpers/table';
import { Table } from 'antd';
import styled from 'styled-components';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import {
  matchStateEnum,
  tournamentFormatEnum,
  tournamentRankingStrategyEnum,
} from '@/modules/shared/helpers/enumHelpers';
import { longDateFormat } from '@/modules/shared/helpers/time';
import PropTypes from 'prop-types';

function prepareColumns({ tournament, isAdmin }) {
  const columns = [];

  // Queued
  if (isAdmin) {
    columns.push({
      title: <FormattedMessage id="app.shared.matchList.queued" />,
      key: 'queued',
      width: 200,
      align: 'center',
      render: (text, record) =>
        intlGlobal.formatDate(
          new Date(record.lastExecution.created),
          longDateFormat,
        ),
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

      return intlGlobal.formatDate(
        new Date(record.lastExecution.executed),
        longDateFormat,
      );
    },
  });

  // Players and scores
  columns.push({
    title: <FormattedMessage id="app.shared.matchList.players" />,
    key: 'username',
    render: (text, record) => {
      const isSinglePlayer =
        tournament.format === tournamentFormatEnum.SINGLE_PLAYER;
      let bestScore;

      if (
        tournament.rankingStrategy === tournamentRankingStrategyEnum.MAXIMUM
      ) {
        bestScore = Math.max(
          ...record.lastExecution.botResults.map(x => x.score),
        );
      } else {
        bestScore = Math.min(
          ...record.lastExecution.botResults.map(x => x.score),
        );
      }

      if (record.state === matchStateEnum.QUEUED) {
        return record.submissions.map((x, index) => [
          <span key={`sep_${x.author.id}`}>{index ? ' vs ' : ''}</span>,
          <span key={x.author.id}>{x.author.username} </span>,
        ]);
      }

      return record.lastExecution.botResults.map((x, index) => [
        <span key={`sep_${x.submission.author.id}`}>
          {index ? ' vs ' : ''}
        </span>,
        <span
          key={x.submission.author.id}
          style={{
            fontWeight:
              x.score === bestScore &&
              record.state === matchStateEnum.EXECUTED &&
              !isSinglePlayer
                ? 700
                : 400,
          }}
        >
          {x.submission.author.username}{' '}
          {record.state === matchStateEnum.EXECUTED && !isSinglePlayer ? (
            <span>({x.score})</span>
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
