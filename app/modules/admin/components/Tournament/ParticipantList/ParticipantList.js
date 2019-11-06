import { Table } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import {
  getDeleteResourceButton,
  getSearchProps,
} from '@/modules/shared/helpers/table';

function prepareColumns(props) {
  return [
    {
      title: <FormattedMessage id="app.generic.email" />,
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      ...getSearchProps('email'),
    },
    {
      title: <FormattedMessage id="app.generic.username" />,
      dataIndex: 'user.username',
      key: 'username',
      sorter: false,
      ...getSearchProps('username'),
    },
    {
      ...getDeleteResourceButton(
        props.deleteItem,
        record => record.email,
        props.isDeleting,
      ),
    },
  ];
}

const ParticipantList = props => (
  <Table
    columns={prepareColumns(props)}
    rowKey={record => record.id}
    {...props}
  />
);

export default withAjax(ParticipantList);
