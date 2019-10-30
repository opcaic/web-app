import React from 'react';
import { Table } from 'antd';
import { FormattedMessage } from 'react-intl';
import {
  getSearchProps,
  getEditResourceButton,
} from '@/modules/shared/helpers/table';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';

const createTemplateKey = template =>
  `${template.name}/${template.languageCode}`;

const columns = [
  {
    title: <FormattedMessage id="app.admin.emailTemplate.name" />,
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    ...getSearchProps('name'),
  },
  {
    title: <FormattedMessage id="app.admin.emailTemplate.languageCode" />,
    dataIndex: 'languageCode',
    key: 'languageCode',
    ...getSearchProps('languageCode'),
  },
  {
    ...getEditResourceButton(
      record => `/admin/emailTemplates/${createTemplateKey(record)}`,
    ),
  },
];

class EmailTemplateList extends React.PureComponent {
  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => createTemplateKey(record)}
        {...this.props}
      />
    );
  }
}

export default withAjax(EmailTemplateList);
