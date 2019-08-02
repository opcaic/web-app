import { Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import { getSearchProps } from '@/modules/shared/helpers/table';

const columns = [
  {
    title: <FormattedMessage id="app.generic.id" />,
    dataIndex: 'id',
    key: 'id',
    sorter: true,
  },
  {
    title: <FormattedMessage id="app.admin.gameList.name" />,
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    ...getSearchProps('name'),
  },
  {
    title: <FormattedMessage id="app.generic.action" />,
    key: 'action',
    render: (text, record) => (
      <span>
        <Link to={`/admin/games/${record.id}`}>
          <FormattedMessage id="app.generic.edit" />
        </Link>
      </span>
    ),
  },
];

const GameList = props => (
  <Table columns={columns} rowKey={record => record.id} {...props} />
);

export default withAjax(GameList);
