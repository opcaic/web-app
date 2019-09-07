import { Table } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withAjax from '@/modules/shared/helpers/hocs/withAjax';
import {
  getEditResourceButton,
  getSearchProps,
} from '@/modules/shared/helpers/table';
import {
  tournamentFormatEnum,
  tournamentRankingStrategyEnum,
  tournamentScopeEnum,
} from '@/modules/shared/helpers/enumHelpers';

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
    title: <FormattedMessage id="app.admin.tournamentList.rankingStrategy" />,
    dataIndex: 'rankingStrategy',
    key: 'rankingStrategy',
    render: id => tournamentRankingStrategyEnum.helpers.idToText(id),
    filters: tournamentRankingStrategyEnum.helpers.getFilterOptions(),
    filterMultiple: false,
  },
  {
    ...getEditResourceButton(record => `/admin/tournaments/${record.id}`),
  },
];

const TournamentList = props => (
  <Table columns={columns(props)} rowKey={record => record.id} {...props} />
);

export default withAjax(TournamentList);
