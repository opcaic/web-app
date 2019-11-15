import { Table, Button } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import { getActionProps, getSearchProps } from '@/modules/shared/helpers/table';

function prepareColumns(props) {
  return [
    {
      title: <FormattedMessage id="app.generic.email" />,
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      ...getSearchProps('email'),
    },
    {
      title: <FormattedMessage id="app.generic.username" />,
      dataIndex: 'user.username',
      key: 'username',
      sorter: false,
      ...getSearchProps('username'),
    },
    {
      ...getActionProps((text, record) => (
        <Button
          type="danger"
          loading={props.isDeleting}
          onClick={() => props.deleteAction(record.email)}
        >
          <FormattedMessage id="app.generic.delete" />
        </Button>
      )),
    },
  ];
}

const ParticipantList = props => (
  <Table
    columns={prepareColumns(props)}
    rowKey={record => record.id}
    {...props}
  />
);

export default withAjax(ParticipantList);
