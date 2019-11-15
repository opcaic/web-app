import { Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import {
  getDetailActionProps,
  getSearchProps,
} from '@/modules/shared/helpers/table';

const columns = editLinkGenerator => [
  {
    title: <FormattedMessage id="app.admin.document.name" />,
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    ...getSearchProps('name'),
    render: (text, record) => (
      <span>
        <Link to={editLinkGenerator(record.id)}>{text}</Link>
      </span>
    ),
  },
  {
    ...getDetailActionProps(record => editLinkGenerator(record.id)),
  },
];

const DocumentList = props => (
  <Table
    columns={columns(props.editLinkGenerator)}
    rowKey={record => record.id}
    {...props}
  />
);

export default withAjax(DocumentList);
