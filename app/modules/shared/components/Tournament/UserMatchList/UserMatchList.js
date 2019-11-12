import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getThemedDetailActionProps } from '@/modules/shared/helpers/table';
import { Icon, Table, Tooltip } from 'antd';
import styled from 'styled-components';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import {
  matchResultEnum,
  matchStateEnum,
} from '@/modules/shared/helpers/enumHelpers';
import PropTypes from 'prop-types';
import {
  formatScore,
  getBestScore,
  getSubmissionUsername,
  getUserResult,
} from '@/modules/shared/helpers/resources/matches';
import { Link } from 'react-router-dom';
import TimeAgo from '@/modules/shared/components/TimeAgo';
import { theme } from '@/modules/shared/helpers/utils';

const viewType = {
  PUBLIC: 'public',
  DASHBOARD: 'dashboard',
};

function getResultIcon(result) {
  let icon = null;

  switch (result) {
    case matchResultEnum.TIE:
      icon = {
        icon: 'trophy',
        color: theme.DANGER_COLOR,
      };
      break;

    case matchResultEnum.WINNER:
      icon = {
        icon: 'trophy',
        color: theme.SUCCESS_COLOR,
      };
      break;

    default:
      icon = {
        icon: 'minus',
        color: theme.ERROR_COLOR,
      };
      break;
  }

  return (
    <Tooltip title={matchResultEnum.helpers.idToText(result)}>
      <Icon type={icon.icon} style={{ color: icon.color, fontSize: 20 }} />
    </Tooltip>
  );
}

function prepareColumns({ user, view }) {
  const columns = [];

  // Executed
  columns.push({
    title: <FormattedMessage id="app.shared.userMatchList.date" />,
    key: 'executed',
    width: 200,
    align: view === viewType.PUBLIC ? 'center' : 'left',
    render: (text, record) => <TimeAgo date={record.lastExecution.executed} />,
  });

  if (view === viewType.DASHBOARD) {
    // Tournament
    columns.push({
      title: <FormattedMessage id="app.shared.userMatchList.tournament" />,
      dataIndex: 'tournament.name',
      key: 'tournament',
      render: (text, record) => (
        <Link to={`/tournaments/${record.tournament.id}`}>{text}</Link>
      ),
    });
  }

  // Players and scores
  columns.push({
    title: <FormattedMessage id="app.shared.userMatchList.players" />,
    key: 'username',
    render: (text, record) => {
      const bestScore = getBestScore(
        record.lastExecution.botResults,
        record.tournament.rankingStrategy,
      );

      // Sort bot results so the current user is always the first one in the list
      const botResults = record.lastExecution.botResults.filter(
        x => x.submission.author === null || x.submission.author.id !== user.id,
      );
      const currentUserResult = record.lastExecution.botResults.find(
        x => x.submission.author && x.submission.author.id === user.id,
      );
      if (currentUserResult) {
        botResults.unshift(currentUserResult);
      }
      return botResults.map((x, index) => [
        <span key={`sep_${x.submission.id}`}>{index ? ' vs ' : ''}</span>,
        <span
          key={x.submission.id}
          style={{
            fontWeight:
              x.score === bestScore && record.state === matchStateEnum.EXECUTED
                ? 700
                : 400,
          }}
        >
          {getSubmissionUsername(x.submission)} ({formatScore(x.score)})
        </span>,
      ]);
    },
  });

  // Tournament
  columns.push({
    title: <FormattedMessage id="app.shared.userMatchList.result" />,
    key: 'result',
    align: 'center',
    render: (text, record) =>
      getResultIcon(
        getUserResult(
          user.id,
          record.lastExecution.botResults,
          record.tournament.rankingStrategy,
        ),
      ),
  });

  columns.push({
    ...getThemedDetailActionProps(
      record => `/tournaments/${record.tournament.id}/matches/${record.id}`,
    ),
  });

  return columns;
}

const StyledTable = styled(Table)`
  & .ant-pagination.ant-table-pagination {
    ${props => (!props.isAdmin ? 'margin-right: 16px;' : '')};
  }
`;

const UserMatchList = props => (
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

UserMatchList.propTypes = {
  emptyText: PropTypes.node,
  user: PropTypes.object.isRequired,
  view: PropTypes.oneOf(['public', 'dashboard']),
};

export default withAjax(UserMatchList);
