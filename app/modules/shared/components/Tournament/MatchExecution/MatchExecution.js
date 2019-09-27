import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  getDynamicTableChildren,
  getDynamicTableColumns,
} from '@/modules/shared/helpers/table';
import { Descriptions, Table, Typography } from 'antd';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import {
  entryPointResultEnum,
  tournamentRankingStrategyEnum,
} from '@/modules/shared/helpers/enumHelpers';
import PropTypes from 'prop-types';
import { longDateFormat } from '@/modules/shared/helpers/time';

function hasEntries(object) {
  return object && Object.entries(object).length !== 0;
}

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

  if (hasEntries(additionalData)) {
    columns.push(
      getDynamicTableColumns(
        <FormattedMessage id="app.shared.matchExecution.additionalData" />,
        'additionalData',
        additionalData,
        record => record.additionalData,
      ),
    );
  }

  return columns;
}

const MatchExecution = props => {
  // eslint-disable-next-line prefer-destructuring
  const additionalData = props.matchExecution.additionalData;

  return (
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
            {intlGlobal.formatDate(
              props.matchExecution.created,
              longDateFormat,
            )}
          </Descriptions.Item>
        )}

        {props.matchExecution.executorResult !==
          entryPointResultEnum.NOT_EXECUTED && (
          <Descriptions.Item
            label={<FormattedMessage id="app.shared.matchExecution.executed" />}
          >
            {intlGlobal.formatDate(
              props.matchExecution.executed,
              longDateFormat,
            )}
          </Descriptions.Item>
        )}

        <Descriptions.Item
          label={<FormattedMessage id="app.shared.matchExecution.players" />}
        >
          {props.match.submissions.map((x, index) => [
            <span key={`sep_${x.author.id}`}>{index ? ', ' : ''}</span>,
            <span key={x.author.id}>{x.author.username}</span>,
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
            rowKey={record => record.submission.author.id}
            locale={{
              emptyText: (
                <EmptyTablePlaceholder
                  text={
                    <FormattedMessage id="app.shared.matchList.noMatches" />
                  }
                />
              ),
            }}
            dataSource={props.matchExecution.botResults}
            bordered
            size="middle"
            pagination={false}
          />

          {hasEntries(additionalData) && (
            <div>
              <Typography.Title level={3} style={{ marginTop: 20 }}>
                <FormattedMessage id="app.shared.matchExecution.additionalMatchData" />
              </Typography.Title>

              <Table
                columns={getDynamicTableChildren(
                  '',
                  additionalData,
                  record => record,
                  false,
                )}
                rowKey={record => record.id}
                dataSource={[additionalData]}
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
};

MatchExecution.propTypes = {
  matchExecution: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
};

export default MatchExecution;
