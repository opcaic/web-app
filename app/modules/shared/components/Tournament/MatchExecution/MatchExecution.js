import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  getDynamicTableChildren,
  getDynamicTableColumns,
} from '@/modules/shared/helpers/table';
import { Button, Descriptions, Table, Typography } from 'antd';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import {
  entryPointResultEnum,
  tournamentRankingStrategyEnum,
} from '@/modules/shared/helpers/enumHelpers';
import PropTypes from 'prop-types';
import { longDateFormat } from '@/modules/shared/helpers/time';
import { Link } from 'react-router-dom';
import {
  formatScore,
  getSubmissionUsername,
} from '@/modules/shared/helpers/resources/matches';
import styled from 'styled-components';
import LogModal from '@/modules/shared/components/Tournament/LogModal';

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
    render: (text, record) =>
      record.score === bestScore ? (
        <b>{getSubmissionUsername(record.submission)}</b>
      ) : (
        getSubmissionUsername(record.submission)
      ),
  });

  columns.push({
    title: <FormattedMessage id="app.shared.matchExecution.score" />,
    key: 'score',
    dataIndex: 'score',
    render: (text, record) =>
      record.score === bestScore ? (
        <b>{formatScore(record.score)}</b>
      ) : (
        formatScore(record.score)
      ),
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

const ShowLogButton = styled(Button)`
  height: 22px;
  float: right;
`;

class MatchExecution extends Component {
  state = {
    logModalVisible: false,
    logModalTitle: null,
    logModalText: null,
  };

  showLog = (title, text) => {
    this.setState({
      logModalVisible: true,
      logModalTitle: title,
      logModalText: text,
    });
  };

  hideLog = () => {
    this.setState({ logModalVisible: false });
  };

  render() {
    // eslint-disable-next-line prefer-destructuring
    const additionalData = this.props.matchExecution.additionalData;
    const shouldDisplayCompilerResults =
      this.props.isAdmin && this.props.matchExecution.botResults;
    const shouldDisplayException =
      this.props.isAdmin && this.props.matchExecution.exception !== null;

    return (
      <div>
        <LogModal
          visible={this.state.logModalVisible}
          title={this.state.logModalTitle}
          log={this.state.logModalText}
          onCancel={this.hideLog}
          onOk={this.hideLog}
          footer={
            <Button onClick={this.hideLog}>
              <FormattedMessage id="app.shared.matchExecution.closeLog" />
            </Button>
          }
        />

        <Descriptions
          title={
            <Typography.Title level={3}>
              <FormattedMessage id="app.shared.matchExecution.basicInformation" />
            </Typography.Title>
          }
          column={1}
          size="small"
          bordered
        >
          {this.props.isAdmin && (
            <Descriptions.Item
              label={<FormattedMessage id="app.shared.matchExecution.id" />}
            >
              {this.props.matchExecution.id}
            </Descriptions.Item>
          )}

          {this.props.isAdmin && (
            <Descriptions.Item
              label={<FormattedMessage id="app.shared.matchExecution.jobId" />}
            >
              {this.props.matchExecution.jobId}
            </Descriptions.Item>
          )}

          {this.props.isAdmin && (
            <Descriptions.Item
              label={
                <FormattedMessage id="app.shared.matchExecution.executorResult" />
              }
            >
              {entryPointResultEnum.helpers.idToText(
                this.props.matchExecution.executorResult,
              )}

              {this.props.matchExecution.executorResult !==
                entryPointResultEnum.NOT_EXECUTED && (
                <ShowLogButton
                  size="small"
                  onClick={() =>
                    this.showLog(
                      <FormattedMessage id="app.shared.matchExecution.executorResultModalTitle" />,
                      this.props.matchExecution.executorLog,
                    )
                  }
                >
                  <FormattedMessage id="app.shared.submission.showLog" />
                </ShowLogButton>
              )}
            </Descriptions.Item>
          )}

          {shouldDisplayException && (
            <Descriptions.Item
              label={
                <FormattedMessage id="app.shared.matchExecution.exception" />
              }
            >
              {this.props.matchExecution.exception}
            </Descriptions.Item>
          )}

          {this.props.isAdmin && (
            <Descriptions.Item
              label={
                <FormattedMessage id="app.shared.matchExecution.created" />
              }
            >
              {intlGlobal.formatDate(
                this.props.matchExecution.created,
                longDateFormat,
              )}
            </Descriptions.Item>
          )}

          {this.props.matchExecution.executorResult !==
            entryPointResultEnum.NOT_EXECUTED && (
            <Descriptions.Item
              label={
                <FormattedMessage id="app.shared.matchExecution.executed" />
              }
            >
              {intlGlobal.formatDate(
                this.props.matchExecution.executed,
                longDateFormat,
              )}
            </Descriptions.Item>
          )}

          <Descriptions.Item
            label={<FormattedMessage id="app.shared.matchExecution.players" />}
          >
            {this.props.match.submissions.map((x, index) => [
              <span key={`sep_${x.id}`}>{index ? ', ' : ''}</span>,
              <span key={x.id}>
                {getSubmissionUsername(x)}
                {this.props.isAdmin && (
                  <span>
                    {' '}
                    (
                    <Link
                      to={`/admin/tournaments/${
                        this.props.match.tournament.id
                      }/submissions/${x.id}`}
                    >
                      <FormattedMessage id="app.shared.matchExecution.submission" />
                    </Link>
                    )
                  </span>
                )}
              </span>,
            ])}
          </Descriptions.Item>
        </Descriptions>

        {this.props.matchExecution.executorResult !==
          entryPointResultEnum.NOT_EXECUTED && (
          <div style={{ marginTop: 15 }}>
            <Button
              type="primary"
              icon="download"
              onClick={() => this.props.downloadFiles()}
            >
              <FormattedMessage id="app.shared.matchExecution.downloadFiles" />
            </Button>
          </div>
        )}

        {shouldDisplayCompilerResults && (
          <div>
            <Typography.Title level={3} style={{ marginTop: 20 }}>
              <FormattedMessage id="app.shared.matchExecution.compilerResults" />
            </Typography.Title>

            <Descriptions column={1} size="small" bordered>
              {this.props.matchExecution.botResults.map(x => (
                <Descriptions.Item
                  label={x.submission.author.username}
                  key={x.submission.id}
                >
                  {entryPointResultEnum.helpers.idToText(x.compilerResult)}
                  <ShowLogButton
                    size="small"
                    onClick={() =>
                      this.showLog(
                        <FormattedMessage
                          id="app.shared.matchExecution.compilerResultModalTitle"
                          values={{ player: x.submission.author.username }}
                        />,
                        x.compilerLog,
                      )
                    }
                  >
                    <FormattedMessage id="app.shared.submission.showLog" />
                  </ShowLogButton>
                </Descriptions.Item>
              ))}
            </Descriptions>
          </div>
        )}

        {this.props.matchExecution.executorResult ===
          entryPointResultEnum.SUCCESS && (
          <div>
            <Typography.Title level={3} style={{ marginTop: 20 }}>
              <FormattedMessage id="app.shared.matchExecution.playersData" />
            </Typography.Title>

            <Table
              columns={prepareColumns(this.props)}
              rowKey={record => record.submission.id}
              locale={{
                emptyText: (
                  <EmptyTablePlaceholder
                    text={
                      <FormattedMessage id="app.shared.matchList.noMatches" />
                    }
                  />
                ),
              }}
              dataSource={this.props.matchExecution.botResults}
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
  }
}

MatchExecution.propTypes = {
  matchExecution: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  downloadFiles: PropTypes.func.isRequired,
};

export default MatchExecution;
