import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getSearchProps } from '@/modules/shared/helpers/table';
import { Icon, Table } from 'antd';
import styled from 'styled-components';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import PropTypes from 'prop-types';
import { tournamentFormatEnum } from '@/modules/shared/helpers/enumHelpers';
import {
  getParticipationUsername,
  getPlaceText,
} from '@/modules/shared/helpers/resources/leaderboards';
import { formatScore } from '@/modules/shared/helpers/resources/matches';

function getCrownColor(place) {
  if (place === 1) {
    return '#C98910';
  }
  if (place === 2) {
    return '#A8A8A8';
  }
  return '#965A38';
}

function prepareColumns({ leaderboard }) {
  const columns = [];

  columns.push({
    title: <FormattedMessage id="app.shared.leaderboard.place" />,
    dataIndex: 'place',
    key: 'place',
    width: 50,
    align: 'center',
    render: (text, record) =>
      record.place <= 3 ? <b>{getPlaceText(record)}</b> : getPlaceText(record),
  });

  columns.push({
    title: <FormattedMessage id="app.shared.leaderboard.name" />,
    key: 'author.username',
    sorter: true,
    render: (text, record) =>
      record.place <= 3 ? (
        <b>
          <Icon
            type="crown"
            theme="twoTone"
            twoToneColor={getCrownColor(record.place)}
          />{' '}
          {getParticipationUsername(record)}
        </b>
      ) : (
        getParticipationUsername(record)
      ),
    ...getSearchProps('name'),
  });

  if (
    leaderboard != null &&
    (leaderboard.format === tournamentFormatEnum.ELO ||
      leaderboard.format === tournamentFormatEnum.SINGLE_PLAYER ||
      leaderboard.format === tournamentFormatEnum.TABLE)
  ) {
    columns.push({
      title:
        leaderboard.format === tournamentFormatEnum.ELO ? (
          <FormattedMessage id="app.shared.leaderboard.elo" />
        ) : (
          <FormattedMessage id="app.shared.leaderboard.score" />
        ),
      dataIndex: 'submissionScore',
      key: 'submissionScore',
      align: 'center',
      width: 100,
      render: (text, record) => formatScore(record.submissionScore),
    });
  }

  columns.push({
    title: <FormattedMessage id="app.shared.leaderboard.organization" />,
    dataIndex: 'author.organization',
    key: 'author.organization',
    width: 200,
  });

  return columns;
}

const StyledTable = styled(Table)`
  & .ant-pagination.ant-table-pagination {
    margin-right: 16px;
  }
`;

const Leaderboard = props => (
  <StyledTable
    columns={prepareColumns(props)}
    rowKey={record => record.submissionId}
    pagination={false}
    locale={{
      emptyText: (
        <EmptyTablePlaceholder
          text={<FormattedMessage id="app.shared.leaderboard.noData" />}
        />
      ),
    }}
    {...props}
  />
);

Leaderboard.propTypes = {
  leaderboard: PropTypes.object,
};

export default Leaderboard;
