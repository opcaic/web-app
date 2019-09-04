import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getDetailActionProps } from '@/modules/shared/helpers/table';
import { Table } from 'antd';
import styled from 'styled-components';
import { intl } from '@/modules/shared/helpers/IntlGlobalProvider';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';

const columns = () => [
  {
    title: <FormattedMessage id="app.public.matchList.date" />,
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
    title: <FormattedMessage id="app.public.matchList.players" />,
    dataIndex: 'botResults',
    key: 'botResults',
    render: (text, record) =>
      record.botResults.map((x, index) => (
        <span key={x.submission.author.id}>
          {index ? ' vs ' : ''}
          {x.submission.author.username} ({x.score})
        </span>
      )),
  },
  {
    ...getDetailActionProps(
      record => `/tournaments/${record.tournament.id}/matches/${record.id}`,
    ),
  },
];

const StyledTable = styled(Table)`
  & .ant-pagination.ant-table-pagination {
    margin-right: 16px;
  }
`;

const MatchList = props => (
  <StyledTable
    columns={columns(props)}
    rowKey={record => record.id}
    locale={{
      emptyText: (
        <EmptyTablePlaceholder
          text={<FormattedMessage id="app.public.matchList.noMatches" />}
        />
      ),
    }}
    {...props}
  />
);

MatchList.propTypes = {};

export default withAjax(MatchList);
