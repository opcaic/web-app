import { Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

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
      <FormattedMessage id="app.admin.userList.role" defaultMessage="Role" />
    ),
    dataIndex: 'roleId',
    key: 'role',
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

export default UserList;
