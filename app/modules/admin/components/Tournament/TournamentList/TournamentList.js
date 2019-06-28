import { Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
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

const TournamentList = props => (
  <Table columns={columns} rowKey={record => record.id} {...props} />
);

export default TournamentList;
