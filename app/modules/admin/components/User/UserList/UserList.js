import { Table } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import { userRoleEnum } from '@/modules/shared/helpers/enumHelpers';
import {
  getEditResourceButton,
  getSearchProps,
} from '@/modules/shared/helpers/table';
import TimeAgo from 'react-timeago';

const columns = () => [
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
    title: <FormattedMessage id="app.admin.userList.created" />,
    dataIndex: 'created',
    key: 'created',
    sorter: true,
    render: date => <TimeAgo date={date} />,
  },
  {
    title: <FormattedMessage id="app.admin.userList.role" />,
    dataIndex: 'role',
    key: 'userRole',
    render: id => userRoleEnum.helpers.idToText(id),
    filters: userRoleEnum.helpers.getFilterOptions(),
    filterMultiple: false,
  },
  {
    ...getEditResourceButton(record => `/admin/users/${record.id}`),
  },
];

const UserList = props => (
  <Table columns={columns()} rowKey={record => record.id} {...props} />
);

export default withAjax(UserList);
