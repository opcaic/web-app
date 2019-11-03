import React from 'react';
import { List } from 'antd';
import TournamentCard from '@/modules/public/components/Tournament/TournamentCard';
import { tournamentListItemPropType } from '@/modules/public/utils/propTypes';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

const TournamentCardList = props => {
  const { updateFilter, emptyText, loading, dataSource } = props;

  return (
    <List
      grid={{
        gutter: 16,
        xs: 4,
      }}
      renderItem={item => (
        <List.Item>
          <TournamentCard tournament={item} updateFilter={updateFilter} />
        </List.Item>
      )}
      locale={{
        emptyText: (
          <EmptyTablePlaceholder
            text={
              emptyText || (
                <FormattedMessage id="app.public.tournamentCardList.noTournaments" />
              )
            }
          />
        ),
      }}
      dataSource={dataSource}
      loading={loading}
    />
  );
};

TournamentCardList.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape(tournamentListItemPropType)),
  emptyText: PropTypes.object,
  updateFilter: PropTypes.func,
  loading: PropTypes.bool,
};

export default TournamentCardList;
