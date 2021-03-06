import { Table, Button } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import { getActionProps } from '@/modules/shared/helpers/table';

function prepareColumns(props) {
  return [
    {
      title: <FormattedMessage id="app.generic.email" />,
      key: 'email',
      sorter: (a, b) => a < b,
    },
    {
      ...getActionProps((text, record) => (
        <Button
          type="danger"
          loading={props.isDeleting}
          onClick={() => props.deleteItem(record)}
          hidden={!props.canDelete}
        >
          <FormattedMessage id="app.generic.delete" />
        </Button>
      )),
    },
  ];
}

const ManagersList = props => (
  <Table columns={prepareColumns(props)} rowKey={record => record} {...props} />
);

export default withAjax(ManagersList);
