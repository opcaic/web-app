import { Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Link to={`/admin/tournaments/${record.id}`}>Edit</Link>
      </span>
    ),
  },
];

const UserList = props => (
  <Table columns={columns} rowKey={record => record.id} {...props} />
);

export default UserList;
