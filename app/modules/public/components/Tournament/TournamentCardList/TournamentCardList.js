import React from 'react';
import { List } from 'antd';
import TournamentCard from '@/modules/public/components/Tournament/TournamentCard';
import { tournamentListItemPropType } from '@/modules/public/utils/propTypes';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

const TournamentCardList = props => (
  <List
    grid={{
      gutter: 16,
      xs: 4,
    }}
    renderItem={item => (
      <List.Item>
        <TournamentCard tournament={item} />
      </List.Item>
    )}
    locale={{
      emptyText: (
        <EmptyTablePlaceholder
          text={
            props.emptyText ? (
              props.emptyText
            ) : (
              <FormattedMessage id="app.public.tournamentCardList.noTournaments" />
            )
          }
        />
      ),
    }}
    {...props}
  />
);

TournamentCardList.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape(tournamentListItemPropType)),
  emptyText: PropTypes.string,
};

export default TournamentCardList;
