import { Table } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import {
  getEditResourceButton,
  getSearchProps,
} from '@/modules/shared/helpers/table';

const columns = [
  {
    title: <FormattedMessage id="app.admin.gameList.name" />,
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    ...getSearchProps('name'),
  },
  {
    ...getEditResourceButton(record => `/admin/games/${record.id}`),
  },
];

const GameList = props => (
  <Table columns={columns} rowKey={record => record.id} {...props} />
);

export default withAjax(GameList);
