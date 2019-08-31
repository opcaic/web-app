import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { getSearchProps } from '@/modules/shared/helpers/table';
import { Icon, Table } from 'antd';
import styled from 'styled-components';

function getCrownColor(place) {
  if (place === 1) {
    return '#C98910';
  }
  if (place === 2) {
    return '#A8A8A8';
  }
  return '#965A38';
}

const columns = () => [
  {
    title: <FormattedMessage id="app.public.leaderboard.place" />,
    dataIndex: 'place',
    key: 'place',
    width: 50,
    align: 'center',
    render: (text, record) => (record.place <= 3 ? <b>{text}</b> : text),
  },
  {
    title: <FormattedMessage id="app.public.leaderboard.name" />,
    dataIndex: 'name',
    key: 'name',
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
  },
  {
    title: <FormattedMessage id="app.public.leaderboard.score" />,
    dataIndex: 'score',
    key: 'score',
    align: 'center',
    width: 100,
  },
  {
    title: <FormattedMessage id="app.public.leaderboard.organization" />,
    dataIndex: 'organization',
    key: 'organization',
    width: 200,
  },
];

const StyledTable = styled(Table)`
  & .ant-pagination.ant-table-pagination {
    margin-right: 16px;
  }
`;

const Leaderboard = props => (
  <StyledTable
    columns={columns(props)}
    rowKey={record => record.name}
    {...props}
  />
);

Leaderboard.propTypes = {
  type: PropTypes.oneOf(['singleplayer']).isRequired,
};

export default Leaderboard;
