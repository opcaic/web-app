import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  getThemedDetailActionProps,
  getEmptyColumnProps,
  getDetailActionProps,
  getSearchProps,
} from '@/modules/shared/helpers/table';
import { Icon, Table, Tooltip } from 'antd';
import styled from 'styled-components';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import { submissionValidationStateEnum } from '@/modules/shared/helpers/enumHelpers';
import PropTypes from 'prop-types';
import { theme } from '@/modules/shared/helpers/utils';
import { Link } from 'react-router-dom';
import TimeAgo from '@/modules/shared/components/TimeAgo/TimeAgo';

const viewType = {
  ADMIN: 'admin',
  PUBLIC: 'public',
  DASHBOARD: 'dashboard',
};

function getStateIcon(state) {
  if (state === submissionValidationStateEnum.QUEUED) {
    return (
      <Tooltip
        placement="bottom"
        title={
          <FormattedMessage id="app.shared.submission.stateNotValidatedTooltip" />
        }
      >
        <Icon
          type="question-circle"
          style={{ color: theme.DANGER_COLOR, fontSize: 22 }}
        />
      </Tooltip>
    );
  }

  if (state === submissionValidationStateEnum.VALID) {
    return (
      <Tooltip
        placement="bottom"
        title={
          <FormattedMessage id="app.shared.submission.stateSuccessTooltip" />
        }
      >
        <Icon
          type="check-circle"
          style={{ color: theme.SUCCESS_COLOR, fontSize: 22 }}
        />
      </Tooltip>
    );
  }

  if (state === submissionValidationStateEnum.INVALID) {
    return (
      <Tooltip
        placement="bottom"
        title={
          <FormattedMessage id="app.shared.submission.stateInvalidTooltip" />
        }
      >
        <Icon
          type="exclamation-circle"
          style={{ color: theme.ERROR_COLOR, fontSize: 22 }}
        />
      </Tooltip>
    );
  }

  if (state === submissionValidationStateEnum.ERROR) {
    return (
      <Tooltip
        placement="bottom"
        title={
          <FormattedMessage id="app.shared.submission.stateErrorTooltip" />
        }
      >
        <Icon
          type="exclamation-circle"
          style={{ color: theme.ERROR_COLOR, fontSize: 22 }}
        />
      </Tooltip>
    );
  }

  return null;
}

const prepareColumns = ({ view }) => {
  const columns = [];

  // Date
  columns.push({
    title: <FormattedMessage id="app.shared.submissionList.date" />,
    key: 'date',
    width: view === viewType.DASHBOARD ? null : 200,
    align: view === viewType.DASHBOARD ? 'left' : 'center',
    render: (text, record) => <TimeAgo date={record.created} />,
  });

  if (view === viewType.ADMIN) {
    columns.push({
      title: <FormattedMessage id="app.shared.submissionList.user" />,
      dataIndex: 'author.username',
      key: 'username',
      ...getSearchProps('username'),
    });
  }

  // Tournament
  if (view === viewType.DASHBOARD) {
    columns.push({
      title: <FormattedMessage id="app.shared.submissionList.tournament" />,
      dataIndex: 'tournament.name',
      key: 'tournament',
      render: (text, record) => (
        <Link to={`/tournaments/${record.tournament.id}`}>{text}</Link>
      ),
    });
  }

  // Validation state
  {
    const column = {
      title: <FormattedMessage id="app.shared.submissionList.state" />,
      dataIndex: 'state',
      key: 'validationState',
      width: 150,
      align: 'center',
      render: (text, record) => getStateIcon(record.validationState),
      filters: submissionValidationStateEnum.helpers.getFilterOptions(),
      filterMultiple: false,
    };

    if (view === viewType.DASHBOARD) {
      column.width = null;
      column.filters = null;
    }

    columns.push(column);
  }

  // Is active
  if (view !== viewType.DASHBOARD) {
    columns.push({
      title: <FormattedMessage id="app.shared.submissionList.isActive" />,
      dataIndex: 'isActive',
      key: 'isActive',
      width: 150,
      align: 'center',
      render: (text, record) =>
        record.isActive && (
          <Icon type="check" style={{ color: '#52c41a', fontSize: 22 }} />
        ),
      filters: [
        {
          value: true,
          text: (
            <FormattedMessage id="app.shared.submissionList.isActiveFilter" />
          ),
        },
      ],
      filterMultiple: false,
    });
  }

  // Empty column
  if (view === viewType.PUBLIC) {
    columns.push({
      ...getEmptyColumnProps(),
    });
  }

  // Detail button
  switch (view) {
    case viewType.ADMIN:
      columns.push({
        ...getDetailActionProps(
          record =>
            `/admin/tournaments/${record.tournament.id}/submissions/${
              record.id
            }`,
        ),
      });
      break;

    case viewType.PUBLIC:
      columns.push({
        ...getThemedDetailActionProps(
          record =>
            `/tournaments/${record.tournament.id}/submissions/${record.id}`,
        ),
      });
      break;

    case viewType.DASHBOARD:
      columns.push({
        ...getThemedDetailActionProps(
          record =>
            `/tournaments/${record.tournament.id}/submissions/${record.id}`,
          { props: { size: 'small' }, width: null },
        ),
      });
      break;

    default:
      break;
  }

  return columns;
};

const StyledTable = styled(Table)`
  & .ant-pagination.ant-table-pagination {
    margin-right: 16px;
  }
`;

const SubmissionList = props => (
  <StyledTable
    columns={prepareColumns(props)}
    rowKey={record => record.id}
    locale={{
      emptyText: (
        <EmptyTablePlaceholder
          text={
            <FormattedMessage id="app.shared.submissionList.noSubmissions" />
          }
        />
      ),
    }}
    {...props}
  />
);

SubmissionList.propTypes = {
  view: PropTypes.oneOf(['admin', 'public', 'dashboard']),
};

export default withAjax(SubmissionList);
