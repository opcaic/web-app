import { Table } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';

const columns = () => [
  {
    title: <FormattedMessage id="app.admin.systemWorkers.identity" />,
    dataIndex: 'identity',
    key: 'identity',
    sorter: (a, b) => a < b,
  },
  {
    title: <FormattedMessage id="app.admin.systemWorkers.currentJob" />,
    dataIndex: 'currentJob',
    key: 'currentJob',
    sorter: (a, b) => a < b,
  },
  {
    title: <FormattedMessage id="app.admin.systemWorkers.games" />,
    dataIndex: 'games',
    key: 'games',
    render: games =>
      games.reduce((acc, val) => (acc === '' ? val : `${acc}, ${val}`), ''),
  },
];

const WorkerList = props => (
  <Table columns={columns()} rowKey={record => record.identity} {...props} />
);

export default withAjax(WorkerList, false, false);
