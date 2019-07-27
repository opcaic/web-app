import { Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import { roleIdToText } from '@/modules/shared/helpers/roles';

const columns = [
  {
    title: <FormattedMessage id="app.generic.id" defaultMessage="ID" />,
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: <FormattedMessage id="app.generic.email" defaultMessage="Email" />,
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: (
      <FormattedMessage id="app.generic.username" defaultMessage="Username" />
    ),
    dataIndex: 'email',
    key: 'username',
  },
  {
    title: (
      <FormattedMessage id="app.admin.userList.role" defaultMessage="Role" />
    ),
    dataIndex: 'roleId',
    key: 'roles.js',
    render: text => roleIdToText(text),
    filters: [1, 2, 3].map(x => ({
      value: x,
      text: roleIdToText(x),
    })),
  },
  {
    title: <FormattedMessage id="app.generic.action" defaultMessage="Action" />,
    key: 'action',
    render: (text, record) => (
      <span>
        <Link to={`/admin/users/${record.id}`}>
          <FormattedMessage id="app.generic.edit" defaultMessage="Edit" />
        </Link>
      </span>
    ),
  },
];

const UserList = props => (
  <Table columns={columns} rowKey={record => record.id} {...props} />
);

export default withAjax(UserList);
