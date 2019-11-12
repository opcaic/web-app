import { Table } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import { getDetailActionProps } from '@/modules/shared/helpers/table';
import {
  tournamentFormatEnum,
  tournamentStateEnum,
} from '@/modules/shared/helpers/enumHelpers';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { longDateFormat } from '@/modules/shared/helpers/time';
import TimeAgo from '@/modules/shared/components/TimeAgo';
import { Link } from 'react-router-dom';

const columns = () => [
  {
    title: <FormattedMessage id="app.admin.tournamentList.name" />,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: <FormattedMessage id="app.admin.tournamentList.game" />,
    dataIndex: 'game.name',
    key: 'gameId',
    render: (text, record) => (
      <Link to={`/admin/games/${record.game.id}`}>{text}</Link>
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
  },
  {
    title: <FormattedMessage id="app.admin.tournamentList.state" />,
    dataIndex: 'state',
    key: 'state',
    render: id => tournamentStateEnum.helpers.idToText(id),
  },
  {
    title: <FormattedMessage id="app.admin.tournamentList.format" />,
    dataIndex: 'format',
    key: 'format',
    render: id => tournamentFormatEnum.helpers.idToText(id),
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
  },
  {
    ...getDetailActionProps(record => `/admin/tournaments/${record.id}`),
  },
];

const TournamentList = props => (
  <Table columns={columns(props)} rowKey={record => record.id} {...props} />
);

export default withAjax(TournamentList, false, false);
