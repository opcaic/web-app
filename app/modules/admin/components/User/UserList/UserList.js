import { Table } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import { roleIdToText } from '@/modules/shared/helpers/roles';
import { getActionProps, getSearchProps } from '@/modules/shared/helpers/table';

const columns = [
  {
    title: <FormattedMessage id="app.generic.username" />,
    dataIndex: 'username',
    key: 'username',
    sorter: true,
    ...getSearchProps('username'),
  },
  {
    title: <FormattedMessage id="app.generic.email" />,
    dataIndex: 'email',
    key: 'email',
    sorter: true,
    ...getSearchProps('email'),
  },
  {
    title: <FormattedMessage id="app.admin.userList.role" />,
    dataIndex: 'userRole',
    key: 'userRole',
    render: text => roleIdToText(text),
    filters: [1, 2, 3].map(x => ({
      value: x,
      text: roleIdToText(x),
    })),
    filterMultiple: false,
  },
  {
    ...getActionProps(record => `/admin/users/${record.id}`),
  },
];

const UserList = props => (
  <Table columns={columns} rowKey={record => record.id} {...props} />
);

export default withAjax(UserList);
