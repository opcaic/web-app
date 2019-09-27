import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getSearchProps } from '@/modules/shared/helpers/table';
import { Icon, Table } from 'antd';
import styled from 'styled-components';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import PropTypes from 'prop-types';
import { tournamentFormatEnum } from '@/modules/shared/helpers/enumHelpers';

function getCrownColor(place) {
  if (place === 1) {
    return '#C98910';
  }
  if (place === 2) {
    return '#A8A8A8';
  }
  return '#965A38';
}

function getPlaceText(record) {
  if (record.place !== record.placeShared) {
    return `${record.place}.-${record.placeShared}.`;
  }

  return `${record.place}.`;
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
    dataIndex: 'user.username',
    key: 'user.username',
    sorter: true,
    render: (text, record) =>
      record.place <= 3 ? (
        <b>
          <Icon
            type="crown"
            theme="twoTone"
            twoToneColor={getCrownColor(record.place)}
          />{' '}
          {text}
        </b>
      ) : (
        text
      ),
    ...getSearchProps('name'),
  });

  if (
    leaderboard != null &&
    (leaderboard.tournamentFormat === tournamentFormatEnum.ELO ||
      leaderboard.tournamentFormat === tournamentFormatEnum.SINGLE_PLAYER ||
      leaderboard.tournamentFormat === tournamentFormatEnum.TABLE)
  ) {
    columns.push({
      title: <FormattedMessage id="app.shared.leaderboard.score" />,
      dataIndex: 'score',
      key: 'score',
      align: 'center',
      width: 100,
    });
  }

  columns.push({
    title: <FormattedMessage id="app.shared.leaderboard.organization" />,
    dataIndex: 'user.organization',
    key: 'user.organization',
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
    rowKey={record => record.user.id}
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
