import { Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import { getSearchProps } from '@/modules/shared/helpers/table';
import {
  tournamentFormatEnum,
  tournamentRankingStrategyEnum,
  tournamentScopeEnum,
} from '@/modules/shared/helpers/enumHelpers';

const columns = props => [
  {
    title: <FormattedMessage id="app.generic.id" />,
    dataIndex: 'id',
    key: 'id',
    sorter: true,
  },
  {
    title: <FormattedMessage id="app.admin.tournamentList.name" />,
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    ...getSearchProps('name'),
  },
  {
    title: <FormattedMessage id="app.admin.tournamentList.game" />,
    dataIndex: 'game.name',
    key: 'gameId',
    filters: props.games.map(x => ({
      value: x.id,
      text: x.name,
    })),
    filterMultiple: false,
  },
  {
    title: <FormattedMessage id="app.admin.tournamentList.format" />,
    dataIndex: 'format',
    key: 'format',
    render: id => tournamentFormatEnum.idToText(id),
    filters: tournamentFormatEnum.getFilterOptions(),
    filterMultiple: false,
  },
  {
    title: <FormattedMessage id="app.admin.tournamentList.scope" />,
    dataIndex: 'scope',
    key: 'scope',
    render: id => tournamentScopeEnum.idToText(id),
    filters: tournamentScopeEnum.getFilterOptions(),
    filterMultiple: false,
  },
  {
    title: <FormattedMessage id="app.admin.tournamentList.rankingStrategy" />,
    dataIndex: 'rankingStrategy',
    key: 'rankingStrategy',
    render: id => tournamentRankingStrategyEnum.idToText(id),
    filters: tournamentRankingStrategyEnum.getFilterOptions(),
    filterMultiple: false,
  },
  {
    title: <FormattedMessage id="app.generic.action" />,
    key: 'action',
    render: (text, record) => (
      <span>
        <Link to={`/admin/tournaments/${record.id}`}>
          <FormattedMessage id="app.generic.edit" />
        </Link>
      </span>
    ),
  },
];

const TournamentList = props => (
  <Table columns={columns(props)} rowKey={record => record.id} {...props} />
);

export default withAjax(TournamentList);
