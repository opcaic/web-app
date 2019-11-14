import { Table } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import {
  getDetailActionProps,
  getSearchProps,
} from '@/modules/shared/helpers/table';

const columns = [
  {
    title: <FormattedMessage id="app.admin.game.name" />,
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    ...getSearchProps('name'),
  },
  {
    title: <FormattedMessage id="app.admin.game.key" />,
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: <FormattedMessage id="app.admin.gameList.activeTournamentsCount" />,
    dataIndex: 'activeTournamentsCount',
    key: 'activeTournamentsCount',
    align: 'center',
  },
  {
    ...getDetailActionProps(record => `/admin/games/${record.id}`),
  },
];

const GameList = props => (
  <Table columns={columns} rowKey={record => record.id} {...props} />
);

export default withAjax(GameList);
