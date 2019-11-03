import { Table, Button } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import { getActionProps } from '@/modules/shared/helpers/table';
import TimeAgo from 'react-timeago';

const columns = props => [
  {
    title: <FormattedMessage id="app.admin.systemItems.jobId" />,
    dataIndex: 'payload.jobId',
    key: 'jobId',
    sorter: (a, b) => a < b,
  },
  {
    title: <FormattedMessage id="app.admin.systemItems.game" />,
    dataIndex: 'payload.game',
    key: 'game',
    sorter: (a, b) => a < b,
    filters: props.games.map(x => ({
      value: x.key,
      text: x.name,
    })),
    filterMultiple: false,
  },
  {
    title: <FormattedMessage id="app.admin.systemItems.queuedTime" />,
    dataIndex: 'queuedTime',
    key: 'queuedTime',
    sorter: (a, b) => a < b,
    render: date => <TimeAgo date={date} />,
  },
  {
    ...getActionProps(
      (text, record) => (
        <Button
          type="primary"
          onClick={() => props.prioritizeItem(record.payload.jobId)}
        >
          <FormattedMessage id="app.admin.systemItems.prioritize" />
        </Button>
      ),
      'prioritizeAction',
    ),
  },
  {
    ...getActionProps(
      (text, record) => (
        <Button
          type="danger"
          onClick={() => props.cancelItem(record.payload.jobId)}
        >
          <FormattedMessage id="app.admin.systemItems.cancel" />
        </Button>
      ),
      'cancelAction',
    ),
  },
];

const ItemList = props => (
  <Table
    columns={columns(props)}
    rowKey={record => record.payload.jobId}
    {...props}
  />
);

export default withAjax(ItemList, false, false);
