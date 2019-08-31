import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  getDetailActionProps,
  getEmptyColumnProps,
} from '@/modules/shared/helpers/table';
import { Icon, Table, Tooltip } from 'antd';
import styled from 'styled-components';
import { intl } from '@/modules/shared/helpers/IntlGlobalProvider';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';

function getStateIcon(state) {
  // TODO: fix when ready
  if (state === 0) {
    return (
      <Tooltip
        placement="bottom"
        title={
          <FormattedMessage id="app.public.submissionList.stateNotValidatedTooltip" />
        }
      >
        <Icon
          type="question-circle"
          style={{ color: '#faad14', fontSize: 22 }}
        />
      </Tooltip>
    );
  }

  if (state === 1) {
    return (
      <Tooltip
        placement="bottom"
        title={
          <FormattedMessage id="app.public.submissionList.stateSuccessTooltip" />
        }
      >
        <Icon type="check-circle" style={{ color: '#52c41a', fontSize: 22 }} />
      </Tooltip>
    );
  }

  if (state === 2) {
    return (
      <Tooltip
        placement="bottom"
        title={
          <FormattedMessage id="app.public.submissionList.stateErrorTooltip" />
        }
      >
        <Icon
          type="exclamation-circle"
          style={{ color: '#f5222d', fontSize: 22 }}
        />
      </Tooltip>
    );
  }

  return null;
}

const columns = () => [
  {
    title: <FormattedMessage id="app.public.submissionList.date" />,
    dataIndex: 'date',
    key: 'date',
    width: 200,
    align: 'center',
    render: (text, record) =>
      intl.formatDate(new Date(record.date), {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        minute: 'numeric',
        hour: 'numeric',
      }),
  },
  {
    title: <FormattedMessage id="app.public.submissionList.isActive" />,
    dataIndex: 'isActive',
    key: 'isActive',
    width: 150,
    align: 'center',
    render: (text, record) =>
      record.isActive && (
        <Icon type="check" style={{ color: '#52c41a', fontSize: 22 }} />
      ),
  },
  {
    title: <FormattedMessage id="app.public.submissionList.state" />,
    dataIndex: 'state',
    key: 'state',
    width: 150,
    align: 'center',
    render: (text, record) => {
      // TODO: fix when ready
      const state = record.id % 3;
      return getStateIcon(state);
    },
  },
  {
    ...getEmptyColumnProps(),
  },
  {
    ...getDetailActionProps(
      record => `/tournaments/${record.tournament.id}/submissions/${record.id}`,
    ),
  },
];

const StyledTable = styled(Table)`
  & .ant-pagination.ant-table-pagination {
    margin-right: 16px;
  }
`;

const SubmissionList = props => (
  <StyledTable
    columns={columns(props)}
    rowKey={record => record.id}
    locale={{
      emptyText: (
        <EmptyTablePlaceholder
          text={
            <FormattedMessage id="app.public.submissionList.noSubmissions" />
          }
        />
      ),
    }}
    {...props}
  />
);

SubmissionList.propTypes = {};

export default withAjax(SubmissionList);
