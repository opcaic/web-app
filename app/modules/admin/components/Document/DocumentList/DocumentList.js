import { Table, Button, Popconfirm } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import {
  getActionProps,
  getDetailActionProps,
  getSearchProps,
} from '@/modules/shared/helpers/table';

const columns = props => [
  {
    title: <FormattedMessage id="app.admin.document.name" />,
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    ...getSearchProps('name'),
  },
  {
    ...getDetailActionProps(record => props.editLinkGenerator(record.id)),
  },
  {
    ...getActionProps(
      (text, record) => (
        <Popconfirm
          title={<FormattedMessage id="app.admin.confirms.deleteDocument" />}
          onConfirm={() => props.deleteDocument(record.id)}
        >
          <Button type="danger">
            <FormattedMessage id="app.generic.delete" />
          </Button>
        </Popconfirm>
      ),
      'deleteDocument',
    ),
  },
];

const DocumentList = props => (
  <Table columns={columns(props)} rowKey={record => record.id} {...props} />
);

export default withAjax(DocumentList);
