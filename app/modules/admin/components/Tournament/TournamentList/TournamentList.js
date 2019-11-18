import { Table } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import { Link } from 'react-router-dom';
import {
  getDetailActionProps,
  getSearchProps,
} from '@/modules/shared/helpers/table';
import {
  tournamentFormatEnum,
  tournamentScopeEnum,
  tournamentStateEnum,
} from '@/modules/shared/helpers/enumHelpers';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { longDateFormat } from '@/modules/shared/helpers/time';
import TimeAgo from '@/modules/shared/components/TimeAgo';

const columns = props => [
  {
    title: <FormattedMessage id="app.admin.tournamentList.name" />,
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    ...getSearchProps('name'),
  },
  {
    title: <FormattedMessage id="app.admin.tournamentList.game" />,
    dataIndex: 'game',
    key: 'gameId',
    filters: props.games.map(x => ({
      value: x.id,
      text: x.name,
    })),
    filterMultiple: false,
    render: record => (
      <Link to={`/admin/games/${record.id}`}>{record.name}</Link>
    ),
  },
  {
    title: <FormattedMessage id="app.admin.tournamentList.created" />,
    dataIndex: 'created',
    key: 'created',
    render: date =>
      date ? (
        <TimeAgo date={date} />
      ) : (
        <FormattedMessage id="app.admin.tournamentList.noPublished" />
      ),
    sorter: true,
  },
  {
    title: <FormattedMessage id="app.admin.tournamentList.published" />,
    dataIndex: 'published',
    key: 'published',
    render: date =>
      date ? (
        <TimeAgo date={date} />
      ) : (
        <FormattedMessage id="app.admin.tournamentList.noPublished" />
      ),
    sorter: true,
  },
  {
    title: <FormattedMessage id="app.admin.tournamentList.state" />,
    dataIndex: 'state',
    key: 'state',
    render: id => tournamentStateEnum.helpers.idToText(id),
    filters: tournamentStateEnum.helpers.getFilterOptions(),
    filterMultiple: false,
  },
  {
    title: <FormattedMessage id="app.admin.tournamentList.format" />,
    dataIndex: 'format',
    key: 'format',
    render: id => tournamentFormatEnum.helpers.idToText(id),
    filters: tournamentFormatEnum.helpers.getFilterOptions(),
    filterMultiple: false,
  },
  {
    title: <FormattedMessage id="app.admin.tournamentList.scope" />,
    dataIndex: 'scope',
    key: 'scope',
    render: id => tournamentScopeEnum.helpers.idToText(id),
    filters: tournamentScopeEnum.helpers.getFilterOptions(),
    filterMultiple: false,
  },
  {
    title: <FormattedMessage id="app.admin.tournamentList.deadline" />,
    dataIndex: 'deadline',
    key: 'deadline',
    render: date =>
      date ? (
        intlGlobal.formatDate(date, longDateFormat)
      ) : (
        <FormattedMessage id="app.admin.tournamentList.noDeadline" />
      ),
    sorter: true,
  },
  {
    ...getDetailActionProps(record => `/admin/tournaments/${record.id}`),
  },
];

const TournamentList = props => (
  <Table columns={columns(props)} rowKey={record => record.id} {...props} />
);

export default withAjax(TournamentList);
