import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getDetailActionProps } from '@/modules/shared/helpers/table';
import { Table } from 'antd';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import {
  matchStateEnum,
  tournamentFormatEnum,
  entryPointResultEnum,
} from '@/modules/shared/helpers/enumHelpers';
import {
  formatScore,
  getBestScore,
} from '@/modules/shared/helpers/resources/matches';
import TimeAgo from '@/modules/shared/components/TimeAgo/TimeAgo';
import { Link } from 'react-router-dom';

const prepareColumns = () => [
  {
    title: <FormattedMessage id="app.shared.matchList.queued" />,
    key: 'queued',
    width: 150,
    render: (text, record) => <TimeAgo date={record.lastExecution.created} />,
  },
  {
    title: <FormattedMessage id="app.shared.matchList.executed" />,
    key: 'executed',
    width: 150,
    render: (text, record) => {
      if (record.state === matchStateEnum.QUEUED) {
        return null;
      }

      return <TimeAgo date={record.lastExecution.executed} />;
    },
  },
  {
    title: <FormattedMessage id="app.generic.tournament" />,
    key: 'tournament',
    dataIndex: 'tournament.name',
    render: (text, record) => (
      <Link to={`/admin/tournaments/${record.tournament.id}`}>{text}</Link>
    ),
  },
  {
    title: <FormattedMessage id="app.shared.matchList.players" />,
    key: 'username',
    render: (text, record) => {
      const isSinglePlayer =
        record.tournament.format === tournamentFormatEnum.SINGLE_PLAYER;
      const bestScore = getBestScore(
        record.lastExecution.botResults,
        record.tournament.rankingStrategy,
      );

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
            <span>({formatScore(x.score)})</span>
          ) : null}
        </span>,
      ]);
    },
  },
  {
    title: <FormattedMessage id="app.shared.matchList.state" />,
    dataIndex: 'lastExecution.executorResult',
    key: 'executorResult',
    render: (text, record) =>
      entryPointResultEnum.helpers.idToText(record.state),
  },
  {
    ...getDetailActionProps(
      record =>
        `/admin/tournaments/${record.tournament.id}/matches/${record.id}`,
    ),
  },
];

const FailedMatchList = props => (
  <Table
    columns={prepareColumns(props)}
    rowKey={record => record.id}
    {...props}
  />
);

export default withAjax(FailedMatchList, false);
