import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  getDynamicTableChildren,
  getDynamicTableColumns,
} from '@/modules/shared/helpers/table';
import { Descriptions, Table, Typography } from 'antd';
import { intl } from '@/modules/shared/helpers/IntlGlobalProvider';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import {
  entryPointResultEnum,
  tournamentRankingStrategyEnum,
} from '@/modules/shared/helpers/enumHelpers';
import PropTypes from 'prop-types';
import { longDateFormat } from '@/modules/shared/helpers/time';

function prepareColumns({ tournament, matchExecution }) {
  const columns = [];

  let bestScore;

  if (tournament.rankingStrategy === tournamentRankingStrategyEnum.MAXIMUM) {
    bestScore = Math.max(...matchExecution.botResults.map(x => x.score));
  } else {
    bestScore = Math.min(...matchExecution.botResults.map(x => x.score));
  }

  columns.push({
    title: <FormattedMessage id="app.shared.matchExecution.player" />,
    key: 'player',
    dataIndex: 'submission.author.username',
    render: (text, record) =>
      record.score === bestScore ? <b>{text}</b> : text,
  });

  columns.push({
    title: <FormattedMessage id="app.shared.matchExecution.score" />,
    key: 'score',
    dataIndex: 'score',
    render: (text, record) =>
      record.score === bestScore ? <b>{text}</b> : text,
    sorter: (a, b) => a.score - b.score,
    defaultSortOrder:
      tournament.rankingStrategy === tournamentRankingStrategyEnum.MAXIMUM
        ? 'descend'
        : 'ascend',
  });

  // eslint-disable-next-line prefer-destructuring
  const additionalData = matchExecution.botResults[0].additionalData;

  columns.push(
    getDynamicTableColumns(
      <FormattedMessage id="app.shared.matchExecution.additionalData" />,
      'additionalData',
      additionalData,
      record => record.additionalData,
    ),
  );

  return columns;
}

const MatchExecution = props => (
  <div>
    <Descriptions
      title={<Typography.Title level={3}>Basic information</Typography.Title>}
      column={1}
      size="small"
      bordered
    >
      {props.isAdmin && (
        <Descriptions.Item
          label={
            <FormattedMessage id="app.shared.matchExecution.executorResult" />
          }
        >
          {entryPointResultEnum.helpers.idToText(
            props.matchExecution.executorResult,
          )}
        </Descriptions.Item>
      )}

      {props.isAdmin && (
        <Descriptions.Item
          label={<FormattedMessage id="app.shared.matchExecution.created" />}
        >
          {intl.formatDate(props.matchExecution.created, longDateFormat)}
        </Descriptions.Item>
      )}

      {props.matchExecution.executorResult !==
        entryPointResultEnum.NOT_EXECUTED && (
        <Descriptions.Item
          label={<FormattedMessage id="app.shared.matchExecution.executed" />}
        >
          {intl.formatDate(props.matchExecution.executed, longDateFormat)}
        </Descriptions.Item>
      )}

      <Descriptions.Item
        label={<FormattedMessage id="app.shared.matchExecution.players" />}
      >
        {props.matchExecution.botResults.map((x, index) => [
          <span>{index ? ', ' : ''}</span>,
          <span key={x.submission.author.id}>
            {x.submission.author.username}
          </span>,
        ])}
      </Descriptions.Item>
    </Descriptions>

    {props.matchExecution.executorResult === entryPointResultEnum.SUCCESS && (
      <div>
        <Typography.Title level={3} style={{ marginTop: 20 }}>
          <FormattedMessage id="app.shared.matchExecution.playersData" />
        </Typography.Title>

        <Table
          columns={prepareColumns(props)}
          rowKey={record => record.id}
          locale={{
            emptyText: (
              <EmptyTablePlaceholder
                text={<FormattedMessage id="app.shared.matchList.noMatches" />}
              />
            ),
          }}
          dataSource={props.matchExecution.botResults}
          bordered
          size="middle"
          pagination={false}
        />

        {props.matchExecution.additionalData && (
          <div>
            <Typography.Title level={3} style={{ marginTop: 20 }}>
              <FormattedMessage id="app.shared.matchExecution.additionalMatchData" />
            </Typography.Title>

            <Table
              columns={getDynamicTableChildren(
                '',
                props.matchExecution.additionalData,
                record => record,
                false,
              )}
              rowKey={record => record.id}
              dataSource={[props.matchExecution.additionalData]}
              bordered
              size="middle"
              pagination={false}
            />
          </div>
        )}
      </div>
    )}
  </div>
);

MatchExecution.propTypes = {
  matchExecution: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default MatchExecution;
