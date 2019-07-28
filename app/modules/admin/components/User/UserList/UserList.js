import { Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import { roleIdToText } from '@/modules/shared/helpers/roles';

const columns = [
  {
    title: <FormattedMessage id="app.generic.id" />,
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: <FormattedMessage id="app.generic.email" />,
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: <FormattedMessage id="app.generic.username" />,
    dataIndex: 'userName',
    key: 'username',
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
    title: <FormattedMessage id="app.generic.action" />,
    key: 'action',
    render: (text, record) => (
      <span>
        <Link to={`/admin/users/${record.id}`}>
          <FormattedMessage id="app.generic.edit" />
        </Link>
      </span>
    ),
  },
];

const UserList = props => (
  <Table columns={columns} rowKey={record => record.id} {...props} />
);

export default withAjax(UserList);
