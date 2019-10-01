import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getThemedDetailActionProps } from '@/modules/shared/helpers/table';
import { Table } from 'antd';
import styled from 'styled-components';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import { tournamentScopeEnum } from '@/modules/shared/helpers/enumHelpers';
import PropTypes from 'prop-types';
import TimeAgo from '@/modules/shared/components/TimeAgo';

function prepareColumns() {
  const columns = [];

  columns.push({
    title: <FormattedMessage id="app.shared.tournamentList.name" />,
    dataIndex: 'name',
    key: 'name',
  });

  columns.push({
    title: <FormattedMessage id="app.shared.tournamentList.deadline" />,
    dataIndex: 'deadline',
    key: 'deadline',
    render: (text, record) =>
      record.scope === tournamentScopeEnum.DEADLINE ? (
        <TimeAgo date={new Date(record.deadline)} />
      ) : (
        <FormattedMessage id="app.shared.tournamentList.withoutDeadline" />
      ),
  });

  columns.push({
    ...getThemedDetailActionProps(record => `/tournaments/${record.id}`, {
      props: { size: 'small' },
      width: null,
    }),
  });

  return columns;
}

const StyledTable = styled(Table)`
  & .ant-pagination.ant-table-pagination {
    ${props => (!props.isAdmin ? 'margin-right: 16px;' : '')};
  }
`;

const TournamentList = props => (
  <StyledTable
    columns={prepareColumns(props)}
    rowKey={record => record.id}
    locale={{
      emptyText: (
        <EmptyTablePlaceholder
          text={
            props.emptyText ? (
              props.emptyText
            ) : (
              <FormattedMessage id="app.shared.tournamentList.noTournaments" />
            )
          }
        />
      ),
    }}
    {...props}
  />
);

TournamentList.propTypes = {
  emptyText: PropTypes.node,
};

export default withAjax(TournamentList);
