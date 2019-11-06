import { Table } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import { getDeleteResourceButton } from '@/modules/shared/helpers/table';

function prepareColumns(props) {
  return [
    {
      title: <FormattedMessage id="app.generic.email" />,
      key: 'email',
      sorter: (a, b) => a < b,
    },
    {
      ...getDeleteResourceButton(
        props.deleteItem,
        record => record,
        props.isDeleting,
      ),
    },
  ];
}

const ManagersList = props => (
  <Table columns={prepareColumns(props)} rowKey={record => record} {...props} />
);

export default withAjax(ManagersList);
