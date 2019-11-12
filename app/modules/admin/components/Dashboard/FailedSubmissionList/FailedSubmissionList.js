import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getDetailActionProps } from '@/modules/shared/helpers/table';
import { Table } from 'antd';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import { submissionValidationStateEnum } from '@/modules/shared/helpers/enumHelpers';
import { Link } from 'react-router-dom';
import TimeAgo from '@/modules/shared/components/TimeAgo/TimeAgo';

function getStateDescription(state) {
  if (state === submissionValidationStateEnum.INVALID) {
    return <FormattedMessage id="app.shared.submission.stateInvalidTooltip" />;
  }

  if (state === submissionValidationStateEnum.ERROR) {
    return <FormattedMessage id="app.shared.submission.stateErrorTooltip" />;
  }

  return null;
}

const prepareColumns = () => [
  {
    title: <FormattedMessage id="app.shared.submissionList.date" />,
    key: 'date',
    width: 150,
    render: (text, record) => <TimeAgo date={record.created} />,
  },
  {
    title: <FormattedMessage id="app.shared.submissionList.user" />,
    dataIndex: 'author.username',
    key: 'username',
  },
  {
    title: <FormattedMessage id="app.shared.submissionList.tournament" />,
    dataIndex: 'tournament.name',
    key: 'tournament',
    align: 'center',
    render: (text, record) => (
      <Link to={`/tournaments/${record.tournament.id}`}>{text}</Link>
    ),
  },
  {
    title: <FormattedMessage id="app.shared.submissionList.state" />,
    dataIndex: 'state',
    key: 'validationState',
    align: 'center',
    render: (text, record) => getStateDescription(record.validationState),
  },
  {
    ...getDetailActionProps(
      record =>
        `/admin/tournaments/${record.tournament.id}/submissions/${record.id}`,
    ),
  },
];

const FailedSubmissionList = props => (
  <Table columns={prepareColumns()} rowKey={record => record.id} {...props} />
);

export default withAjax(FailedSubmissionList, false);
