import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getThemedDetailActionProps } from '@/modules/shared/helpers/table';
import { Table } from 'antd';
import styled from 'styled-components';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import {
  tournamentScopeEnum,
  tournamentStateEnum,
} from '@/modules/shared/helpers/enumHelpers';
import PropTypes from 'prop-types';
import TimeAgo from '@/modules/shared/components/TimeAgo';

const viewType = {
  MY_TOURNAMENTS: 'my-tournaments',
  DASHBOARD: 'dashboard',
};

function prepareColumns({ view }) {
  const columns = [];

  columns.push({
    title: <FormattedMessage id="app.shared.tournamentList.name" />,
    dataIndex: 'name',
    key: 'name',
  });

  if (view === viewType.MY_TOURNAMENTS) {
    columns.push({
      title: <FormattedMessage id="app.public.tournamentList.state" />,
      dataIndex: 'state',
      key: 'state',
      render: id => tournamentStateEnum.helpers.idToText(id),
    });
  }

  columns.push({
    title: <FormattedMessage id="app.shared.tournamentList.deadline" />,
    dataIndex: 'deadline',
    key: 'deadline',
    render: (text, record) =>
      record.scope === tournamentScopeEnum.DEADLINE ? (
        <TimeAgo date={record.deadline} />
      ) : (
        <FormattedMessage id="app.shared.tournamentList.withoutDeadline" />
      ),
  });

  columns.push({
    ...getThemedDetailActionProps(record => `/tournaments/${record.id}`, {
      props: view === viewType.DASHBOARD ? { size: 'small' } : {},
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
  view: PropTypes.oneOf(['my-tournaments', 'dashboard']),
};

export default withAjax(TournamentList);
